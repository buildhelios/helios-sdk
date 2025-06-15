import { HubbleTarget } from "./hubble-types";

export const storeKey="Hubble.targets";

export const loadLocalHubbleTargets=():HubbleTarget[]=>
{
    const targets=localStorage.getItem(storeKey);
    if(targets){
        return JSON.parse(targets);
    }else{
        return [];
    }
}

export const saveLocalHubbleTargets=(targets:HubbleTarget[])=>{
    localStorage.setItem(storeKey,JSON.stringify(targets))
}
