import { invokeGetCurrentUserFn } from "@buildhelios/fn-clients";
import { User, UserAccessToken } from "@buildhelios/types";
import { BaseUser, ReadonlySubject, currentBaseUser, deepCompare, delayAsync } from "@iyio/common";
import { BehaviorSubject } from "rxjs";
import { createUserAccessToken } from "./roles-claims";

export interface UserSignInfo
{
    user:User;
    token:UserAccessToken;
}

export class UserCtrl extends BaseUser
{

    public static get currentUser():User|null{
        const ctrl=currentBaseUser();
        return (ctrl instanceof UserCtrl)?ctrl.user:null;
    }

    private readonly _signIn:BehaviorSubject<UserSignInfo|null>=new BehaviorSubject<UserSignInfo|null>(null);
    public get signInSubject():ReadonlySubject<UserSignInfo|null>{return this._signIn}
    public get signIn(){return this._signIn.value}

    private readonly _user:BehaviorSubject<User|null>=new BehaviorSubject<User|null>(null);
    public get userSubject():ReadonlySubject<User|null>{return this._user}
    public get user(){return this._user.value}

    protected override async _init():Promise<void>
    {
        (window as any).__UC=this;
        await this.updateUserAsync();
    }

    protected override _dispose():void{
        super._dispose();
    }

    private tryId=0;
    private tryUpdateUser()
    {
        const id=++this.tryId;
        (async ()=>{
            for(let attempt=0;attempt<=10;attempt++){

                if(attempt){
                    console.warn('Update user failed. Attempting again');
                    await delayAsync(attempt*500);
                }

                if(id!==this.tryId || await this.updateUserAsync()){
                    return;
                }
            }
        })();
    }

    private _updateUserAsyncId=0;
    private async updateUserAsync():Promise<boolean>
    {
        try{

            const id=++this._updateUserAsyncId;
            const user=await invokeGetCurrentUserFn();

            if(this._updateUserAsyncId!==id || this.isDisposed){
                return true;
            }

            const signIn:UserSignInfo|null=user?{
                user,
                token:createUserAccessToken(user.id,this.claims)
            }:null;

            if(!deepCompare(this._signIn.value,signIn)){
                this._signIn.next(signIn);
                this._user.next(signIn?.user??null);
            }

            return true;
        }catch(ex){
            console.error('Update user failed',ex);
            return false;
        }
    }

    /**
     * Update the value of the user property of the signIn property of this ctrl. The token of the
     * signIn property is not changed.
     * @returns true if there was a change to the user object
     */
    public async refreshUserAsync(){
        try{
            if(!this.signIn){
                return false;
            }
            const id=this._updateUserAsyncId;
            const user=await invokeGetCurrentUserFn();
            if(this._updateUserAsyncId!==id || this.isDisposed || !this.signIn){
                return false;
            }
            const signIn:UserSignInfo|null=user?{
                user,
                token:this.signIn.token
            }:null
            if(deepCompare(this._signIn.value,signIn)){
                return false;
            }
            this._signIn.next(signIn);
            this._user.next(signIn?.user??null);
            return true;
        }catch(ex){
            console.error('Update user failed',ex);
            return false;
        }
    }


}
