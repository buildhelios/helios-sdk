import { heliosHttpDeleteAsync, heliosHttpGetAsync, heliosHttpPostAsync } from "@buildhelios/client";
import { HubbleTarget } from "./hubble-types";

const host=globalThis.window?.location.host??'localhost';

export const loadRemoteHubbleTargetsAsync=async ():Promise<HubbleTarget[]>=>
{
    const targets=await heliosHttpGetAsync(`/${host}::target`);
    return targets??[];
}

export const putRemoteHubbleTargetAsync=async (target:HubbleTarget):Promise<void>=>
{
    await heliosHttpPostAsync(`/${host}::target/${target.id}`,target);
}

export const deleteRemoteHubbleTargetAsync=async (targetId:string):Promise<void>=>
{
    await heliosHttpDeleteAsync(`/${host}::target/${targetId}`);
}
