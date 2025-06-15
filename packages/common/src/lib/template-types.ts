import { MessageRenderTarget, MessageTemplate, TemplateBlock, TemplateContainer, TemplateItem, TemplateModel, TemplateObjType, TemplateSection } from "@buildhelios/types";
import { Rect, Side, Sides } from "@iyio/common";



export interface TemplateBuilderContext
{
    metadata:Record<string,any>;
    renderTarget:MessageRenderTarget;
}

export type TemplateTarget='browser'|'email'|'text';

export interface TemplateModelSelection
{
    type?:Exclude<TemplateObjType,'model'>;
    selected?:TemplateContainer|TemplateSection|TemplateBlock|TemplateItem;
    address?:string;
    rect?:Rect;
    padding?:Sides;
    model?:TemplateModel;
    modelRect?:Rect;
    modelPadding?:Sides;
    container?:TemplateContainer;
    containerRect?:Rect;
    containerPadding?:Sides;
    section?:TemplateSection;
    sectionRect?:Rect;
    sectionPadding?:Sides;
    block?:TemplateBlock;
    blockRect?:Rect;
    blockPadding?:Sides;
    item?:TemplateItem;
    itemRect?:Rect;
    itemPadding?:Sides;
    yRatio?:number;
    xRatio?:number;
    edge?:Side;
}

export interface TemplateAddItem
{
    item?:TemplateItem|(()=>TemplateItem);
    section?:TemplateSection|boolean|(()=>Promise<TemplateSection[]|null|undefined>);
    remove?:TemplateItem|TemplateBlock|TemplateSection|TemplateContainer;
}

export interface TemplateEntities
{
    model?:TemplateModel;
    container?:TemplateContainer;
    section?:TemplateSection;
    block?:TemplateBlock;
    item?:TemplateItem;
}

export type TemplateItemRenderer=(item:TemplateItem,address:string,out:string[],style:string[],model:TemplateModel,ctx:TemplateBuilderContext)=>void|Promise<void>;

export interface TemplateVarCtx
{
    messageRecordId?:string|number;
    formRecordId?:string|number;
    data?:Record<string,any>;

}

export interface FormTemplate
{
    templates:MessageTemplate[];
}
