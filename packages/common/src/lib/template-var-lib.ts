import { renderMessageFnUrlParam } from "@buildhelios/params";
import { getValueByPath } from "@iyio/common";
import { TemplateVarCtx } from "./template-types";

export const replaceTemplateVars=(text:string,{
    messageRecordId,
    data,
}:TemplateVarCtx={}):string=>{
    return text.replace(/\{\{([^}]*)\}\}/g,(_,expression:string)=>{
        expression=expression.trim();
        switch(expression){

            case 'messageRecordId':
                return messageRecordId?.toString()??'';

            case 'viewInBrowserUrl':
                return `${renderMessageFnUrlParam.get()??'#'}?messageId=${messageRecordId}`

            default:
                if(data){
                    const v=getValueByPath(data,expression);
                    if(v!==undefined){
                        return v.toString();
                    }
                }
                return `{{!${expression}}}`;
        }
    })
}
