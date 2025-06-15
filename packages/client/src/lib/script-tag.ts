import { SdkClient } from "./SdkClient";
import { initHeliosClient } from "./client";
import { createDefaultHeliosEvtFn, hubbleAutoOpenGlobalFlag } from "./client-lib";
import { HeliosEvtFn } from "./client-types";

export const initHeliosClientFromScriptTag=async ()=>{

    let heliosFn:HeliosEvtFn|undefined=(globalThis as any)?.heliosEvt;
    if(heliosFn){
        if(typeof heliosFn !== 'function'){
            throw new Error('window.heliosEvt is not a function');
        }
    }else{
        heliosFn=createDefaultHeliosEvtFn();
        (globalThis as any).heliosEvt=heliosFn;
    }
    if(!(globalThis as any).heliosSdk){
        (globalThis as any).heliosSdk=new SdkClient();
    }

    const baseUrl=heliosFn._u;

    const configR=await fetch(baseUrl+'__DOT_ENV__.json');
    const config=await configR.json();

    initHeliosClient({
        apiBaseUrl:config['submitItemFnUrl'],
        targets:[
            {
                selector:'*',
                eventType:'click'
            }
        ],
        ...heliosFn._config
    });

    const autoOpen=/\Wauto-open-hubble-ui=auto-open-hubble-ui(\W|$)/.test(globalThis.window?.location.search??'');
    if(autoOpen || globalThis.localStorage?.getItem('auto-load-hubble-ui')){
        if(autoOpen){
            (window as any)[hubbleAutoOpenGlobalFlag]=hubbleAutoOpenGlobalFlag;
            globalThis.localStorage?.setItem('auto-load-hubble-ui','true')
        }
        const scriptId='hubble-client-script-GkXFCR98zWPEyR8bqCZK';
        if(!document.getElementById(scriptId)){
            const script=document.createElement('script');
            script.id=scriptId;
            script.src=baseUrl+(baseUrl.endsWith('/')?'':'/')+'client-sdk/hubble/client.js';
            document.head.append(script);
        }
    }
}
