import { renderFormFnUrlParam } from "@buildhelios/params";
import { FormRecord, Profile, RenderFormOptions } from "@buildhelios/types";
import { deepClone, objectToQueryParams, uuid } from "@iyio/common";
import { formTemplates } from "./form-template";

export const allowedFormProfileUpdateProps:(keyof Profile)[]=[
    'name',
    'firstName',
    'middleName',
    'lastName',
    'email',
    'website',
    'timezone',
    'phone',
    'country',
    'state',
    'city',
    'address',
    'address2',
    'postalCode',
    'birthDate',
    'jobTitle',
    'company',
    'department',
    'pStat',
    'status',
    'preferredChannel',
] as const;

export const defaultFormTransitionMs=400;


export const getFormUrl=(request:Omit<RenderFormOptions,'form'>|string|number):string=>{
    switch(typeof request){
        case 'string':
            request={
                tag:request
            }
            break;
        case 'number':
            request={
                formId:request
            }
            break;
    }

    return renderFormFnUrlParam()+'?'+objectToQueryParams(request);
}


export const getFormTemplateByTag=(tag:string):FormRecord|undefined=>{
    let match=formTemplates[tag];
    if(!match){
        return undefined;
    }
    match=deepClone(match);
    match.id=0;
    match.uuid=uuid();
    if(!match.tags){
        match.tags=[];
    }
    if(!match.tags.includes(tag)){
        match.tags.push(tag);
    }
    return match;
}

