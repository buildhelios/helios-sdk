import { ResourceAccessToken, UserAccessToken } from "@buildhelios/types";
import { safeParseNumberOrUndefined, type FnEvent } from "@iyio/common";

export const commonClaims={
    heliosAdmin:'heliosAdmin',
    heliosUserId:'heliosUserId',
    name:'name',
    email:'email',
    phone:'phone',
    accountId:'accountId',
} as const;

export const claimTrueValue='1';

export const resourceRolePrefix='res_';

export const rolePrefix='role_';

export const createUserAccessToken=(userId:number|string|null|undefined,claims:Record<string,any>):UserAccessToken=>{

    if(typeof userId === 'number'){
        userId=userId.toString();
    }

    const token:UserAccessToken={
        resources:[],
        roles:[],
        clams:{},
        isAdmin:false,
    }

    if(userId){
        token.userId=userId;
    }


    for(const e in claims){
        const value=claims[e];
        if(!(typeof value === 'string')){
            continue;
        }
        token.clams[e]=value;
        if(e===commonClaims.heliosUserId){
            if(!token.userId){
                token.userId=value;
            }
        }else if(e===commonClaims.accountId){
            token.accountId=safeParseNumberOrUndefined(value);
        }else if(e.startsWith(resourceRolePrefix)){
            const accessToken:ResourceAccessToken={
                resourceId:e.substring(resourceRolePrefix.length),
                roles:[],
            }
            token.resources.push(accessToken);
            const roles=value.split('|');
            for(const r of roles){
                accessToken.roles.push(r);
            }
        }else if(e.startsWith(rolePrefix) && value==claimTrueValue){
            token.roles.push(e.substring(rolePrefix.length));
        }

    }

    if(token.roles.includes('admin')){
        token.isAdmin=true;
    }

    const userIntId=Number(token.clams['heliosUserId']);
    if(isFinite(userIntId)){
        token.userIntId=userIntId;
    }

    return token;
}

export const userTokenFromFnEvent=(fnEvt:FnEvent):UserAccessToken=>createUserAccessToken(fnEvt.sub,fnEvt.claims);
