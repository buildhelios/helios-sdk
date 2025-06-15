import { FormComp } from "./FormComp";
import type { FormCtrl } from "./FormCtrl";

const formLookup:Record<string,FormCtrl>={};
export const getFormCtrl=(id:string|number):FormCtrl|undefined=>{
    return formLookup[id.toString()];
}

export const setFormCtrl=(id:string|number,ctrl:FormCtrl|undefined)=>{
    if(ctrl){
        formLookup[id.toString()]=ctrl;
    }else{
        delete formLookup[id.toString()];
    }
}

export const getFormCtrlForElem=(elem:HTMLElement):FormCtrl|undefined=>{

    let e:HTMLElement|null=elem;
    while(e){
        if(e instanceof FormComp){
            return e.formCtrl??undefined;
        }
        const ctrlId=e.getAttribute('helios-form-ctrl-id');
        if(ctrlId){
            return getFormCtrl(ctrlId);
        }
        e=elem.parentElement;
    }

    return undefined;


}
