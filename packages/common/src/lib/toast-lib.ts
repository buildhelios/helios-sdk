import { removeBehaviorSubjectAryValue, shortUuid } from "@iyio/common";
import { BehaviorSubject } from "rxjs";
import { IconType } from "./icon-types";

export interface ToastItem
{
    id:string;
    icon?: IconType;
    text: string;
    error?: boolean;
    warn?: boolean;
    size?: number;
}

export const allToastItemsSubject=new BehaviorSubject<ToastItem[]>([]);

export const showToast=(item:Omit<ToastItem,'id'>|string)=>{
    if(typeof item === 'string'){
        item={text:item}
    }
    allToastItemsSubject.next([
        ...allToastItemsSubject.value,
        {id:shortUuid(),...item}
    ])
}

export const removeToast=(item:ToastItem)=>{
    removeBehaviorSubjectAryValue(allToastItemsSubject,item);
}
