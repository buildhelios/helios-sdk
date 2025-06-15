import { invokeExportQueryFn, invokeGetExportStatusFn } from "@buildhelios/fn-clients";
import { ExportQueryFormat } from "@buildhelios/types";
import { Query, delayAsync, downloadText, uuid } from "@iyio/common";
import { showToast } from "./toast-lib";

export interface ExportQueryOptions
{
    name:string;
    query:Query;
    format?:ExportQueryFormat;
    showToast?:boolean;
}

export const exportQueryAsync=async ({
    query,
    name,
    format='csv',
    showToast:_showToast
}:ExportQueryOptions)=>{

    const id=uuid();
    const r=invokeExportQueryFn({query,format,uuid:id});

    let urls:string[];
    while (true) {
        const status=await invokeGetExportStatusFn(id);
        if(status.complete){
            urls=status.urls;
            break;
        }
        await delayAsync(2000);
    }

    for(let i=0;i<urls.length;i++){
        const url=urls[i];
        if(!url){
            continue;
        }
        const response=await fetch(url);
        const text=await response.text();
        downloadText(`${name}${i===0?'':`-(${i+1})`}.${format}`,text,format==='json'?'application/json':'text/csv');
    }

    if(_showToast){
        showToast('Export complete')
    }

}
