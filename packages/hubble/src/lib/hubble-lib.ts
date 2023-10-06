import { HubbleTarget } from "./hubble-types";

export const storeKey="Hubble.targets";

export const loadHubbleTargets=():HubbleTarget[]=>
{
    const targets=localStorage.getItem(storeKey);
    if(targets){
        return JSON.parse(targets);
    }else{
        return [];
    }
}
