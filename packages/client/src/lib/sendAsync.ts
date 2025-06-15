import { delayAsync } from "@buildhelios/common";
import { HeliosClientConfig } from "./client-types";

const formatEndpoint=(config:Required<HeliosClientConfig>,endpoint:string):string=>{
    const {apiBaseUrl}=config;
    if(!/^https?:\/\//i.test(endpoint)){
        if(!endpoint.startsWith('/')){
            endpoint='/'+endpoint;
        }
        if(apiBaseUrl){
            endpoint=(apiBaseUrl.endsWith('/')?
                apiBaseUrl.substring(0,apiBaseUrl.length-1):
                apiBaseUrl
            )+endpoint;
        }
    }
    return endpoint;
}

export const sendAsync=async <TResult=any,TBody=any>(
    config:Required<HeliosClientConfig>,
    endpoint:string,
    method:string,
    body?:TBody,
    ignoreResult?:boolean,
    token?:string
):Promise<TResult|undefined>=>{

    endpoint=formatEndpoint(config,endpoint);

    const {maxApiRetires,apiRetireBaseDelayMs}=config;

    let attempt=0;
    let lastError:any;
    let delay=apiRetireBaseDelayMs;
    let errorMessage:string|undefined;
    while(attempt<maxApiRetires){
        attempt++;
        try{

            const sendBody=body===undefined?undefined:JSON.stringify(body);

            if(ignoreResult && globalThis.navigator?.sendBeacon!==undefined){
                const br=globalThis.navigator.sendBeacon(endpoint,sendBody);
                if(br){
                    return undefined;
                }
            }

            const r=await globalThis.fetch?.(endpoint,{
                method,
                body:sendBody,
                headers:token?{
                    ['x-helios-client-token']:token,
                }:undefined
            })

            if(!r){
                return undefined;
            }

            if(r.status===404){
                return undefined;
            }

            if(r.status>=200 && r.status<300){
                if(ignoreResult){
                    return undefined;
                }
                if(r.status===204){
                    return undefined;
                }
                try{
                    return await r.json();
                }catch{
                    return undefined;
                }
            }

            if(r.status>=500 && r.status<=599){
                throw new Error(`Server error ${r.statusText}`);
            }

            errorMessage=`${r.status} - ${r.statusText}`;

        }catch(ex){
            lastError=ex;
            console.error(`Hubble API request failed. Attempt ${attempt} of ${maxApiRetires}`,ex);
            await delayAsync(delay);
            delay*=2;
        }

        throw new Error(`API request failed. ${errorMessage}`);
    }

    throw lastError??new Error('config.HubbleClientConfig is 0 or less');

}
