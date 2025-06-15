import { HeliosEvtFn } from "./client-types";

export const hubbleAutoOpenGlobalFlag='__AUTO_OPEN_HUBBLE__';

const marker='helios-client-direct=%F0%9F%91%8D'

export const createDefaultHeliosEvtFn=():HeliosEvtFn=>{
    const h:HeliosEvtFn=function(){h._.push(arguments)};
    h._=[];

    let baseUrl:string|undefined;
    const scripts=globalThis.document?.getElementsByTagName('script');
    if(scripts){
        for(let i=0;i<scripts.length;i++){
            const s:HTMLScriptElement|null|undefined=scripts.item(i);
            if(s?.src?.includes(marker)){
                const endpoint=/&endpoint=(.*?)[$&]/i.exec(s.src)?.[1];
                if(endpoint){
                    baseUrl=endpoint;
                    break;
                }
                break;
            }
        }
    }
    if(baseUrl){
        if(!baseUrl.endsWith('/')){
            baseUrl+='/';
        }
        h._u=baseUrl;
    }else if(globalThis.location){
        h._u=`${globalThis.location.protocol}//${globalThis.location.host}/`
    }else{
        h._u=`http://localhost/`;
    }
    return h;
}
