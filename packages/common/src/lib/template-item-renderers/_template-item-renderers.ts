import { TemplateItemType } from "@buildhelios/types";
import { TemplateItemRenderer } from "../template-types";
import { socialsRendererAsync } from "./socialsRenderer";
import { tableRenderer } from "./tableRenderer";

export const getTemplateRenderer=(type:TemplateItemType):TemplateItemRenderer|undefined=>{
    switch(type){

        case 'socials':
            return socialsRendererAsync;

        case 'table':
            return tableRenderer;

        default:
            return undefined;
    }
}
