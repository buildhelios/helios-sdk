import { CustomField } from "@buildhelios/types";
import { ZodError } from "zod";

export interface ProfileField extends Omit<CustomField,'id'>
{
    id?:number;
    isCustom?:boolean;
    isNew?:boolean;
}


export interface ProfileFieldParsingResult{
    success:boolean;
    errorMessage?:string;
    error?:ZodError;
    value:any;
}
