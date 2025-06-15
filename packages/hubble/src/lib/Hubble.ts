import { isHeliosClientSignedIn } from "@buildhelios/client";
import { ReadonlySubject } from "@iyio/common";
import { BehaviorSubject } from "rxjs";
import { HubbleMenu } from "./HubbleMenu";
import { loadLocalHubbleTargets, saveLocalHubbleTargets } from "./hubble-local-store";
import { deleteRemoteHubbleTargetAsync, loadRemoteHubbleTargetsAsync, putRemoteHubbleTargetAsync } from "./hubble-remote-store";
import { insertHubbleStyleSheet } from "./hubble-style-sheet";
import { HubbleTarget } from "./hubble-types";


export class Hubble{


    public readonly menu:HubbleMenu;

    public currentTarget:HubbleTarget|null=null;

    private readonly _targets:BehaviorSubject<HubbleTarget[]>=new BehaviorSubject<HubbleTarget[]>([]);
    public get targetsSubject():ReadonlySubject<HubbleTarget[]>{return this._targets}
    public get targets(){return this._targets.value}



    public constructor()
    {
        this.loadTargetsAsync();

        this.menu=new HubbleMenu(this);
    }

    public init()
    {

        insertHubbleStyleSheet();
        window.addEventListener('keyup',this.onKey,true);

        if(location.search?.includes('__hubble_action__=open')){
            this.menu.open=true;
        }
    }

    public dispose()
    {
        this.menu.dispose();
        window.removeEventListener('keyup',this.onKey,true);
    }

    private readonly onKey=(e:KeyboardEvent)=>{
        if(e.ctrlKey && e.shiftKey && e.altKey && (e.key==='1' || e.key==='!')){
            e.preventDefault();
            e.stopPropagation();

            this.menu.open=!this.menu.open;
        }
    }

    public async saveTargetAsync(target:HubbleTarget)
    {
        const targets=[...this._targets.value];
        const matchIndex=targets.findIndex(t=>t.id===target.id);
        if(matchIndex===-1){
            targets.push(target);
        }else{
            targets[matchIndex]=target;
        }
        this._targets.next(targets);

        if(isHeliosClientSignedIn()){
            await putRemoteHubbleTargetAsync(target);
        }else{
            saveLocalHubbleTargets(targets);
        }
    }

    public async deleteTargetAsync(id:string){
        const matchIndex=this.targets.findIndex(t=>t.id===id);
        if(matchIndex===-1){
            return;
        }

        const targets=[...this._targets.value];
        targets.splice(matchIndex,1);
        this._targets.next(targets);

        if(isHeliosClientSignedIn()){
            await deleteRemoteHubbleTargetAsync(id);
        }else{
            saveLocalHubbleTargets(targets);
        }
    }

    public async loadTargetsAsync()
    {
        this._targets.next(isHeliosClientSignedIn()?
            await loadRemoteHubbleTargetsAsync():
            loadLocalHubbleTargets()
        );
    }

}
