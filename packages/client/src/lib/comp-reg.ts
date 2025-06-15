import { defaultCustomComponentPrefix } from "./client-const";
import { getConfig } from "./config";
import { FormComp } from "./forms/FormComp";

const compReg:{name:string,_class:any}[]=[
    {name:'form',_class:FormComp}
]

let registered=false;

export const registerCustomComponents=()=>{
    if(registered){
        return;
    }
    const prefix=getConfig()?.customComponentPrefix??defaultCustomComponentPrefix;
    registered=true;
    for(const comp of compReg){
        globalThis.customElements?.define(prefix+comp.name,comp._class);
    }
}
