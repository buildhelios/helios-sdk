import { initHeliosClient } from "./client";
import { hubbleAutoOpenGlobalFlag } from "./client-lib";

export const clientScriptBaseUrl = 'https://garden-client-sdk.s3.amazonaws.com/garden-iq-client.js?garden-client=%F0%9F%91%8D';

const hubbleUrl='https://garden-client-sdk.s3.amazonaws.com/hubble-client.js';
//const hubbleUrl='dist/hubble-client.js';

export const initHeliosClientFromScriptTag=()=>{

    let apiBaseUrl='https://c6d4ks4pyzo5fl2t7yir4zgtfy0muxeg.lambda-url.us-east-1.on.aws/';

    const scripts=globalThis.document?.getElementsByTagName('script');
    if(scripts){
        const lc=clientScriptBaseUrl.toLowerCase();
        for(let i=0;i<scripts.length;i++){
            const s:HTMLScriptElement|null|undefined=scripts.item(i);
            if(s?.src?.toLowerCase().startsWith(lc)){
                const endpoint=/&endpoint=(.*?)[$&]/i.exec(s.src)?.[1];
                if(endpoint){
                    apiBaseUrl=endpoint;
                    break;
                }
                break;
            }
        }
    }

    initHeliosClient({
        apiBaseUrl,
        targets:[
            {
                selector:'*',
                eventType:'click'
            }
        ]
    });

    if(/\Wauto-open-hubble-ui=auto-open-hubble-ui(\W|$)/.test(globalThis.window?.location.search??'')){
        (window as any)[hubbleAutoOpenGlobalFlag]=hubbleAutoOpenGlobalFlag;
        const scriptId='hubble-client-script-GkXFCR98zWPEyR8bqCZK';
        if(!document.getElementById(scriptId)){
            const script=document.createElement('script');
            script.id=scriptId;
            script.src=hubbleUrl;
            document.head.append(script);
        }
    }
}
