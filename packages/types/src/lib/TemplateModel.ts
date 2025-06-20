/* <ALLOW_AUTO_DELETE DEPENDENCIES="TemplateModel" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import type { TemplateVisibility } from './TemplateVisibility';
import type { TemplateContainer } from './TemplateContainer';

export interface TemplateModel
{
    title?:string;
    darkMode?:boolean;
    linkColor?:string;
    linkWeight?:string;
    linkTextStyle?:string;
    tid?:string;
    marginTop?:string;
    marginBottom?:string;
    marginLeft?:string;
    marginRight?:string;
    paddingTop?:string;
    paddingBottom?:string;
    paddingLeft?:string;
    paddingRight?:string;
    foregroundColor?:string;
    bgColor?:string;
    fontSize?:string;
    fontFamily?:string;
    lineHeight?:string;
    borderRadius?:string;
    primaryColor?:string;
    borderLeftWidth?:string;
    borderLeftColor?:string;
    borderLeftStyle?:string;
    borderRightWidth?:string;
    borderRightColor?:string;
    borderRightStyle?:string;
    borderTopWidth?:string;
    borderTopColor?:string;
    borderTopStyle?:string;
    borderBottomWidth?:string;
    borderBottomColor?:string;
    borderBottomStyle?:string;
    className?:string;
    metadata?:Record<string,any>;
    containers:TemplateContainer[];
    visibility?:TemplateVisibility;
}
