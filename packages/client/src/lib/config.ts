import { delayAsync } from "@iyio/common";
import { HeliosClientConfig } from "./client-types";

let _config:Required<HeliosClientConfig>|undefined;

/**
 * Returns the config the HELIOS client was initialized with or throws an error if the client
 * has not yet been initialized.
 */
export const requireConfig=():Required<HeliosClientConfig>=>{
    if(!_config){
        _config=(window as any).___HeliosClientConfig;
        if(!_config){
            throw new Error('Hubble client not initialized');
        }
    }
    return _config;
}
export const getConfig=():Required<HeliosClientConfig>|undefined=>{
    return _config??(window as any).___HeliosClientConfig;
}
export const getConfigAsync=async ():Promise<Required<HeliosClientConfig>>=>{
    while(true){
        const c=_config??(window as any).___HeliosClientConfig;
        if(c){
            return c;
        }
        await delayAsync(100);
    }
}

export const setConfig=(config:Required<HeliosClientConfig>)=>{
    if(globalThis.window){
        (window as any).___HeliosClientConfig=config;
    }
    _config=config;
}
