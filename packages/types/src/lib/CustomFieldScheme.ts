/* <ALLOW_AUTO_DELETE DEPENDENCIES="CustomField" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { CustomFieldUnionValueScheme } from './CustomFieldUnionValueScheme';
import { CustomFieldTypeScheme } from './CustomFieldTypeScheme';

const __base__CustomFieldScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).describe("The name of the field as it is used in code and stored in the database."),
    displayName:z.string().max(255).optional().describe("A friendly display named show to the user"),
    description:z.string().optional().describe("A short description of the field"),
    formatReg:z.string().max(255).optional().describe("A regular expression used to validate the value of the field"),
    multiSelect:z.boolean().optional().describe("If true a user can select multiple union values"),
    maxLength:z.number().int().optional().describe("The max string length of the field"),
    minLength:z.number().int().optional().describe("The min string length of the field"),
    required:z.boolean().optional().describe("If true the field is required"),
    recordType:z.string().max(255).optional().describe("If the field has a type of \"record\", recordType can be used determine the structure of the field"),
});
const __lazy__CustomFieldScheme=z.object({
    type:z.lazy(()=>CustomFieldTypeScheme).describe("The datatype of the field"),
    unionValues:z.lazy(()=>CustomFieldUnionValueScheme).array().optional(),
});
export const CustomFieldScheme:(typeof __base__CustomFieldScheme)=__base__CustomFieldScheme.merge(__lazy__CustomFieldScheme) as any;
