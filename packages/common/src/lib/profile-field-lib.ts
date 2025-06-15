import { CustomField, CustomFieldType, Profile } from "@buildhelios/types";
import { DataTableColInfo, SqlJsonCastType, getZodErrorMessage, zodCoercePrimitiveType } from "@iyio/common";
import { ZodSchema, z } from "zod";
import { ProfileField, ProfileFieldParsingResult } from "./profile-field-types";

export interface CustomFieldDescription
{
    name?:string;
    path:string;
}
export const profileVars:CustomFieldDescription[]=[
    {path:'profile.name'},
    {path:'profile.firstName'},
    {path:'profile.id'},
    {path:'profile.altId'},
    {path:'profile.uuid'},
    {path:'profile.accountId'},
    {path:'profile.importId'},
    {path:'profile.importBatchId'},
    {path:'profile.name'},
    {path:'profile.firstName'},
    {path:'profile.middleName'},
    {path:'profile.lastName'},
    {path:'profile.email'},
    {path:'profile.website'},
    {path:'profile.created'},
    {path:'profile.lastActivity'},
    {path:'profile.timezone'},
    {path:'profile.phone'},
    {path:'profile.country'},
    {path:'profile.state'},
    {path:'profile.city'},
    {path:'profile.address'},
    {path:'profile.address2'},
    {path:'profile.postalCode'},
    {path:'profile.birthDate'},
    {path:'profile.identificationSource'},
    {path:'profile.identifiedAt'},
    {path:'profile.primaryLocationId'},
    {path:'profile.jobTitle'},
    {path:'profile.company'},
    {path:'profile.department'},
]

export const accountVars:CustomFieldDescription[]=[
    {path:'account.id'},
    {path:'account.name'},
    {path:'account.created'},
    {path:'account.description'},
    {path:'account.timezone'},
    {path:'account.industry'},
    {path:'account.websiteUrl'},
    {path:'account.logoUrl'},
    {path:'account.country'},
    {path:'account.state'},
    {path:'account.city'},
    {path:'account.address'},
    {path:'account.address2'},
    {path:'account.postalCode'},
    {path:'account.privacyPolicyUrl'},
    {path:'account.termsUrl'},
    {path:'account.type'},
]

export const getProfileFieldDotName=(field:ProfileField):string=>{
    return field.isCustom?`data.${field.name}`:field.name;
}

export const isCustomProfileFieldDotName=(name:string)=>{
    return name.startsWith('data.');
}

export const getProfileFieldBaseName=(name:string)=>{
    const i=name.indexOf('.');
    return i===-1?name:name.substring(i+1);
}

export const sqlColToProfileFieldType=(col:DataTableColInfo):CustomFieldType=>{

    const name=col.name.toLowerCase();
    if(name.endsWith('email')){
        return 'email';
    }

    if(name.endsWith('phone')){
        return 'phone';
    }

    return sqlTypeToProfileFieldType(col.sqlType??'string');

}

export const sqlTypeToProfileFieldType=(sqlType:string):CustomFieldType=>{
    sqlType=sqlType.toLowerCase().split('(',1)[0]??'string';
    sqlType=sqlType.replace(/ /g,'');

    switch(sqlType){

        case 'string':
        case 'text':
        case 'varchar':
        case 'character':
        case 'char':
        case 'bpchar':
        case 'charactervarying':
            return 'string';

        case 'number':
        case 'int':
        case 'bigint':
        case 'double':
        case 'single':
        case 'float':
        case 'smallint':
        case 'integer':
        case 'decimal':
        case 'numeric':
        case 'real':
        case 'doubleprecision':
        case 'smallserial':
        case 'serial':
        case 'bigserial':
        case 'money':
            return 'number';

        case 'bool':
        case 'boolean':
            return 'boolean';

        case 'date':
        case 'datetime':
            return 'date';

        default:
            return 'any';
    }
}

const getProfileFieldKey=(field:ProfileField):string=>{
    return `${
        encodeURIComponent(field.name)
    }:${
        encodeURIComponent(field.type)
    }:${
        encodeURIComponent(field.formatReg??'')
    }:${
        encodeURIComponent(field.multiSelect?'1':'0')
    }:${
        encodeURIComponent(field.minLength?.toString()??'')
    }:${
        encodeURIComponent(field.maxLength?.toString()??'')
    }:${
        encodeURIComponent(field.required?'1':'0')
    }:${
        encodeURIComponent(field.recordType??'')
    }:${
        // union values should always be last
        !field.unionValues?'':field.unionValues.map(u=>(
            `${encodeURIComponent(u.type)}:${encodeURIComponent(u.value?.toString()??'')}`
        )).join(',')
    }`
}

const getTypeSchemeBase=(type:CustomFieldType,field?:ProfileField):ZodSchema=>{
    switch(type){

        case 'string':{
            let strScheme=z.string();
            if(field){
                if(field.minLength!==undefined){
                    strScheme=strScheme.min(field.minLength);
                }
                if(field.maxLength!==undefined){
                    strScheme=strScheme.max(field.maxLength);
                }
                if(field.formatReg){
                    try{
                        strScheme=strScheme.regex(new RegExp(field.formatReg));
                    }catch(ex){
                        console.error('Invalid field.formatReg',field.formatReg,ex)
                    }
                }
            }
            return strScheme;
        }

        case 'number':
        case 'timestamp':
            return z.number();

        case 'boolean':
            return z.boolean();

        case 'date':
            return z.date().or(z.string());

        case 'email':
            return z.string().email();

        case 'phone':
            return z.string().regex(/^(\+?[\d\-\(\)]{5,15}|\s*)$/,{message:'Invalid phone number'});

        case 'record':
            return z.record(z.any());

        case 'union':
            if(!field?.unionValues?.length){
                return z.any();
            }
            if(field.unionValues.length===1){
                const a=field.unionValues[0];
                if(!a){
                    return z.any();
                }
                return getTypeSchemeBase(a.type);
            }
            return z.union(field.unionValues.map(u=>getTypeSchemeBase(u.type)) as any);

        default:
            return z.any();
    }
}

const schemeCache:Record<string,ZodSchema>={};
export const getProfileFieldScheme=(field:ProfileField):ZodSchema=>{
    const key=getProfileFieldKey(field);
    const existing=schemeCache[key];
    if(existing){
        return existing;
    }
    let scheme=getTypeSchemeBase(field.type,field);

    if(field.description){
        scheme=scheme.describe(field.description);
    }

    if(!field.required){
        scheme=scheme.optional();
    }

    schemeCache[key]=scheme;
    return scheme;
}

export const parseProfileField=(value:any,field:ProfileField):ProfileFieldParsingResult=>{
    const scheme=getProfileFieldScheme(field);
    let r=scheme.safeParse(value);
    if(r.error){
        r=scheme.safeParse(zodCoercePrimitiveType(scheme,value));
    }
    if(r.error){
        return {
            success:false,
            errorMessage:getZodErrorMessage(r.error),
            error:r.error,
            value:undefined,
        }
    }else{
        return {
            success:true,
            value:r.data,
        }
    }
}

export const createProfilesFromFieldMap=(propMap:Record<string,ProfileField>,cols:string[],items:Record<string,any>[],omitId:boolean):Partial<Profile>[]=>{
    return items.map((item,i)=>createProfileFromFieldMap(propMap,cols,item,omitId,i));
}

export const createProfileFromFieldMap=(propMap:Record<string,ProfileField>,cols:string[],item:Record<string,any>,omitId:boolean,index?:number):Partial<Profile>=>{
    const profile:Partial<Profile>={}

    for(const e of cols){

        const field=propMap[e];

        if(!field || (omitId && !field.isCustom && field.name==='id')){
            continue;
        }

        const parsed=parseProfileField(item[e],field);
        if(parsed.success){
            if(field.isCustom){
                if(!profile.data){
                    profile.data={};
                }
                profile.data[field.name]=parsed.value;
            }else{
                let value=parsed.value;
                if((typeof value === 'string') && value.length>255){
                    value=value.substring(0,255);
                }
                (profile as any)[field.name]=value;
            }
        }else{
            throw new Error(`${index===undefined?'':`row ${index+1} - `}${e} - ${parsed.errorMessage}`)
        }
    }

    return profile;
}

export const propMapToNewCustomFields=(propMap:Record<string,ProfileField>,cols:string[],unmapped?:ProfileField):CustomField[]=>{
    const fields:CustomField[]=[];
    for(const e of cols){
        const prop=propMap[e]??unmapped;
        if(!prop?.isNew){
            continue;
        }
        const field={
            ...prop,
            name:e,
        }
        delete field.isCustom;
        delete field.isNew;
        field.id=0;
        fields.push(field as CustomField);
    }
    return fields;
}

export const customFieldTypeToSqlJsonType=(type:CustomFieldType):SqlJsonCastType=>{
    switch(type){

        case 'number':
            return 'numeric';

        case 'string':
        case 'email':
        case 'phone':
            return 'text';

        case 'date':
            return 'int';

        case 'timestamp':
            return 'int';

        case 'boolean':
            return 'boolean';

        default:
            return 'jsonb';


    }
}
