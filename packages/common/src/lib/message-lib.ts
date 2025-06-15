import { MessageTemplateTable } from "@buildhelios/sql-tables";
import { MessageTemplate, TemplateContainer, TemplateItem, TemplateModel } from "@buildhelios/types";
import { Query, wAryPush, wSetProp } from "@iyio/common";

export interface GetMessagesSelectQueryOptions
{
    embeds?:boolean;
    drafts?:boolean;
    cols?:(keyof MessageTemplate)[]|'info';
}
export const getMessagesSelectQuery=({
    embeds=false,
    drafts=false,
    cols
}:GetMessagesSelectQueryOptions={}):Query=>{
    if(cols==='info'){
        cols=['id','uuid','name','lastUpdated','subject']
    }
    return {
        table:MessageTemplateTable.name,
        columns:cols?.map(c=>({name:c})),
        condition:{
            op:'and',
            conditions:[
                drafts?{
                    left:{col:'isDraft'},
                    op:'=',
                    right:{value:true}
                }:{
                    op:'or',
                    conditions:[
                        {
                            left:{col:'isDraft'},
                            op:'is',
                            right:{value:null}
                        },
                        {
                            left:{col:'isDraft'},
                            op:'=',
                            right:{value:false}
                        }
                    ]
                },
                embeds?{
                    left:{col:'isEmbed'},
                    op:'=',
                    right:{value:true}
                }:{
                    op:'or',
                    conditions:[
                        {
                            left:{col:'isEmbed'},
                            op:'is',
                            right:{value:null}
                        },
                        {
                            left:{col:'isEmbed'},
                            op:'=',
                            right:{value:false}
                        }
                    ]
                },
            ]

        }
    }
}

const nonTextModelKeys:(keyof MessageTemplate)[]=[
    'emailTemplateModel',
    'formTemplateModel'
]

const messageChannelKeys=[
    'emailTemplateModel',
    'smsTemplateModel',
    'notiticationTemplateModel',
] as const

export const getMessageFieldText=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined
):string|undefined=>{
    if(!key){
        return undefined;
    }
    return getMessageField(template,key,0);
}
export const getMessageFieldSubject=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined
):string|undefined=>{
    if(!key){
        return undefined;
    }
    return getMessageField(template,key,1);
}
export const getMessageField=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined,
    itemIndex:number
):string|undefined=>{
    if(!key){
        return undefined;
    }
    return (template?.[key] as TemplateModel)?.containers?.[0]?.sections?.[0]?.blocks?.[0]?.items?.[itemIndex]?.text;
}

export const getMessageFieldTextItem=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined
):TemplateItem|undefined=>{
    return getMessageFieldItem(template,key,0);
}

export const getMessageFieldSubjectItem=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined
):TemplateItem|undefined=>{
    return getMessageFieldItem(template,key,1);
}
const getMessageFieldItem=(
    template:MessageTemplate|null|undefined,
    key:(keyof MessageTemplate)|null|undefined,
    itemIndex:number
):TemplateItem|undefined=>{
    if(!template || !key || nonTextModelKeys.includes(key)){
        return;
    }
    let containers=(template[key] as any)?.containers as TemplateContainer[]|undefined;
    if(!containers){
        containers=[];
        wSetProp(template,key,{containers});
    }
    let container=containers[0];
    if(!container){
        container={sections:[]}
        wAryPush(containers,container);
    }
    let sections=container.sections;
    if(!sections){
        sections=[];
        wSetProp(container,'sections',sections);
    }
    let section=sections[0];
    if(!section){
        section={blocks:[]}
        wAryPush(sections,section);
    }

    let blocks=section.blocks;
    if(!blocks){
        blocks=[];
        wSetProp(section,'blocks',blocks);
    }

    let block=blocks[0];
    if(!block){
        block={items:[]};
        wAryPush(blocks,block);
    }

    let items=block.items;
    if(!items){
        items=[];
        wSetProp(block,'items',items);
    }

    let item=items[itemIndex];
    if(!item){
        while(items.length<=itemIndex){
            item={type:'text'};
            wAryPush(items,item);
        }
    }
    if(item?.type!=='text'){
        wSetProp(item,'type','text');
    }
    return item;
}
