import { HeliosClientConfig } from "./client-types";

let _config:Required<HeliosClientConfig>|undefined;

/**
 * Returns the config the HELIOS client was initialized with or throws an error if the client
 * has not yet been initialized.
 */
export const requireConfig=():Required<HeliosClientConfig>=>{
    if(!_config){
        throw new Error('Hubble client not initialized');
    }
    return _config;
}
export const getConfig=():Required<HeliosClientConfig>|undefined=>{
    return _config;
}

export const setConfig=(config:Required<HeliosClientConfig>)=>{
    _config=config;
}
