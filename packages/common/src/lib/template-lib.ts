import { eventUrlProxyFnUrlParam, mediaBucketParam } from "@buildhelios/params";
import { CommonEventTypesMap, EventUrlProxyRequest, FormRecord, MessageRecord, MessageRenderTarget, MessageTemplate, TemplateBlock, TemplateBox, TemplateContainer, TemplateItem, TemplateItemType, TemplateModel, TemplateSection } from "@buildhelios/types";
import { formatBucketName, s3Client } from '@iyio/aws-s3';
import { MarkdownOutputFormat, MarkdownOutputOptions, MarkdownParsingOptions, Side, asArray, cn, deepClone, deleteUndefined, escapeHtml, formatMarkdown, objectToQueryParamsJson, shortUuid, strFirstToUpper, uuid, wAryRemove, wArySplice, wSetProp } from "@iyio/common";
import { getTemplateRenderer } from "./template-item-renderers/_template-item-renderers";
import { TemplateBuilderContext, TemplateEntities, TemplateModelSelection, TemplateVarCtx } from "./template-types";
import { replaceTemplateVars } from "./template-var-lib";
import { defaultTheme } from "./theme-lib";
import { formatUtmLink } from "./utm-lib";

const collapseBorders=false;

const defaultBg='#ffffff';
const defaultForeground='#111111';
export const defaultContainerWidth='570px';
export const defaultTemplateSpacing='16px';
export const defaultTemplateButtonRadius='5px';

export const defaultTemplateUrl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlkAAAGRCAYAAABWq6YDAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAz9SURBVHgB7d37bpTHHcfhaUJll3VjGk4m4IMwBRTUpGpvpHfYXkpvoKqgIiptiGwOCS4JsZEd2ZWJurMVUWKya6/9ftdezfNILyBkEPgP+6P5zTvzi2+//fZCKeX3BQCArmye6//wp/7z5wIAQCfee++9v7xXAADonMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUA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ASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQIDIAgAIEFkAAAEiCwAgQGQBAASILACAAJEFABAgsgAAAkQWAECAyAIACBBZAAABIgsAIEBkAQAEiCwAgACRBQAQILIAAAJEFgBAgMgCAAgQWQAAASILACBAZAEABIgsAIAAkQUAECCyAAACRBYAQMC5/rPZf/5aAADoxPfff3//f+ygrLE//4jAAAAAAElFTkSuQmCC';

export type TemplateModelUrlReplacer=(url:string,item:TemplateItem|null,ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions)=>string;

let disableSvgTemplateConversion=true;// todo - set default to false
export const setDisableSvgTemplateConversion=(disable:boolean)=>{
    disableSvgTemplateConversion=disable;
}
export const getDisableSvgTemplateConversion=()=>disableSvgTemplateConversion;

const ctxImageUrlReplacedKey='imageUrlReplaced';
export const defaultTrackingProxyUrlReplacer:TemplateModelUrlReplacer=(url,item,{metadata},{message})=>{
    if(!item || !message){
        return url;
    }
    const isImage=item.type==='image' && url!==item.url;
    if(isImage){
        if(metadata[ctxImageUrlReplacedKey]){
            return url;
        }
        metadata[ctxImageUrlReplacedKey]=true;
    }
    const request:EventUrlProxyRequest={
        url,
        type:isImage?CommonEventTypesMap.messageOpen:CommonEventTypesMap.messageCta,
        messageId:message.id,
        messageUuid:message.uuid,
        profileId:message.profileId,
        automationId:message.automationId?.toString(),
        automationNodeId:message.automationNodeId,
        pipe:isImage?true:undefined,
        evtLimit:isImage?1:undefined,
    }
    return eventUrlProxyFnUrlParam()+'?'+objectToQueryParamsJson(deleteUndefined(request));
}

export const getTemplateItemTypeTitle=(type:TemplateItemType|null|undefined):string=>{
    if(!type){
        return ""
    }
    switch(type){

        case 'hr': return 'Horizontal rule (HR)';

        case 'textInput': return "";

        default: return strFirstToUpper(type);
    }
}

const defaultButtonPadding=12;

export interface TemplateModelHtmlOptions
{
    inline?:boolean;
    scope?:string;
    urlReplacer?:TemplateModelUrlReplacer;
    /**
     * If true URLs to images and links will be proxied to track user activity
     */
    enableTrackingProxies?:boolean;
    varCtx?:TemplateVarCtx;
    enableButtonActions?:boolean;
    form?:FormRecord;
    message?:MessageRecord;
    containerWidthOverride?:string;
    containerHeightOverride?:string;
    previewText?:string;
    displayMobile?: boolean;
    resultRef?:{result?:string|undefined}
    renderTarget?:MessageRenderTarget;
}

export const templateModelToEmailHtmlAsync=async (model:TemplateModel,options:TemplateModelHtmlOptions={}):Promise<string>=>{

    options={...options}

    const ctx:TemplateBuilderContext={metadata:{},renderTarget:options.renderTarget??'email'}

    if(options.form){
        if(options.containerWidthOverride===undefined){
            options.containerWidthOverride=options.form.width;
        }
        if(options.containerHeightOverride===undefined){
            options.containerHeightOverride=options.form.height;
        }
    }

    const {
        inline=false,
        scope='template-model-html'
    }=options;

    const out:string[]=[];
    const style:string[]=[];

    for(let i=0;i<model.containers.length;i++){
        const c=model.containers[i];
        if(!c){continue}
        await containerToEmailHtmlAsync(ctx,options,c,scope+'-address_'+i,out,style,model);
    }


    const cs=inline?`.${scope} `:''

    out.unshift(/*html*/`
<style>
${cs} *{
    box-sizing:border-box;
}
${inline?`.${scope}`:'body'}{
    font-size:16px;
}
${cs}table,${cs}tr,${cs}td,${cs}tbody{
    padding:0px;
    margin:0px;
}
${cs}td{
    vertical-align:top;
}
${cs}table{
    border-spacing:0px;
}
${cs}p,${cs}h1,${cs}h2,${cs}h3,${cs}h4,${cs}h5,${cs}h6{
    padding:0;
    margin:0;
}
${cs}a{
    display:inline-block;${
    model.linkColor?`color:${escapeHtml(model.linkColor)};\n`:''}${
    model.linkWeight?`font-weight:${escapeHtml(model.linkWeight)};\n`:''}${
    model.linkTextStyle?`text-decoration:${escapeHtml(model.linkTextStyle)};\n`:''}
}
${cs}hr{
    height:0px;
    border-width:0px;
    border-style:solid;
}
.__template-inherit-color__ a{
    color:inherit;
}
${inline?cs:'body'}{
    background-color:${model.bgColor??defaultBg};
    color:${model.foregroundColor??defaultForeground};
    font-family:sans-serif;
}
@media (prefers-color-scheme: ${model.darkMode?'dark':'light'}){
    ${inline?cs:'body'}{
        background-color:${model.bgColor??defaultBg};
        color:${model.foregroundColor??defaultForeground};
    }
}
${cs}.email-button{
    color:#ffffff;
    text-decoration:none;
    cursor:pointer;
}
${cs}button.email-button{
    text-align:center;
}
.helios-text-input{
    width:100%;
    box-sizing:border-box;
}
.helios-text-input[type="checkbox"]{
    width:unset;
}
${options.displayMobile ? '': `@media screen and (max-width: 600px) {`}
    .mobile-stack,
    .mobile-stack table,
    .mobile-stack tbody,
    .mobile-stack tr,
    .mobile-stack td {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 auto !important;
        text-align: center !important;
        vertical-align: top !important;
    }

    .mobile-stack img {
        width: 100% !important;
    }

    .mobile-stack .email-button {
        width: 100% !important;
        text-align: center !important;
    }
    .__container-width-wrapper{
        width: 100% !important;
        max-width: 100% !important;
    }
${options.displayMobile ? '': `}`}
${options.form?`.${scope}{min-height:100%}`:''}
${style.join('')}
</style>
${inline?`<div class="${escapeHtml(scope)}"${getTemplateBoxStyle(model)}>`:`</head>
<body class="${escapeHtml(scope)}"${getTemplateBoxStyle(model)}>${options.previewText?
`<div style="font-size:0px;line-height:0px;max-height:0px;max-width:0px;">
    ${escapeHtml(options.previewText)}&nbsp;-&nbsp;
</div>`:''}`}`
    );

    if(!inline){
        out.unshift(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${model.title??'Title'}</title>`.trim())
    }


    if(inline){
        out.push(`</div>`);
    }else{
        out.push(`</body></html>`);
    }

    const result=out.join('\n');
    if(options.resultRef){
        options.resultRef.result=result;
    }
    return result;
}

const containerToEmailHtmlAsync=async (ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions,container:TemplateContainer,address:string,out:string[],style:string[],model:TemplateModel)=>{

    const close=openTableBox(out,container,{
        className:`${cn(escapeHtml(address),container.className)} __template-container__`,
        outerStyle:`${model.bgColor?`;background-color:${escapeHtml(model.bgColor)}`:''}`,
        content:{
            width:options.containerWidthOverride??container.width??defaultContainerWidth
        }
    });

    // out.push(`<table cellpadding="0" cellspacing="0" style="width:100%;border-width:0px${(ctx.renderTarget==='email' && collapseBorders)?';border-collapse:collapse':''}${model.bgColor?`;background-color:${escapeHtml(model.bgColor)}`:''}" border="0"><tbody><tr>${
    //     (a==='center' || a==='right')?'<td style="font-size:0">&nbsp;</td>':''
    // }<td style="width:${
    //     options.containerWidthOverride??container.width??defaultContainerWidth
    // };max-width:100%;">`);

    // const border=hasBorder(container);
    // out.push(`<table cellpadding="0" cellspacing="0" class="${cn(escapeHtml(address),container.className)} __template-container__"${getTemplateBoxStyle(container,`width:100%;${
    //     options.containerHeightOverride?`min-height:${options.containerHeightOverride};`:''
    // }${border?'':`;border-width:0px${(ctx.renderTarget==='email' && collapseBorders)?';border-collapse:collapse':''}`}`)}${border?'':' border="0"'}><tbody>`);

    for(let i=0;i<container.sections.length;i++){
        const s=container.sections[i];
        if(!s){continue}
        await sectionToEmailHtmlAsync(ctx,options,s,address+'_'+i,out,style,model,container);
    }


    // out.push(`</tbody></table>`);

    // out.push(`</td>${
    //     (a==='center' || a==='left')?'<td style="font-size:0">&nbsp;</td>':''
    // }</tr></tbody></table>`);
    close();
}

const sectionToEmailHtmlAsync=async (ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions,section:TemplateSection,address:string,out:string[],style:string[],model:TemplateModel,container:TemplateContainer)=>{


    const close=openTableBox(out,section,{
        className:`${cn(escapeHtml(address),section.className)}`
    })

    let cols=section.cols??section.blocks.map<number>(()=>1);
    if(cols.length===0){
        cols=[1]
    }

    let total=0;
    // const len=section.wrap?cols.length:Math.max(cols.length,section.blocks.length);
    const len=Math.max(cols.length,section.blocks.length);
    for(let i=0;i<len;i++){
        total+=cols[i]??1;
    }

    out.push(`<table class="${section.wrap?'mobile-stack':''}" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0px;padding:0px;border-collapse:collapse"><tbody><tr style="margin:0px;padding:0px">`)

    //const border=hasBorder(section);
    //out.push(`\n\n<tr class="${cn(escapeHtml(address),section.className,section.wrap && 'mobile-stack')}"><td><table cellpadding="0" cellspacing="0"${getTemplateBoxStyle(section,`${border?'':`border-width:0px;width:100%;${(ctx.renderTarget==='email' && collapseBorders)?'border-collapse:collapse;':''}`}`)}${border?'':' border="0"'}><tbody>`)

    if(section.blocks.length){
        let c=0;
        //out.push(`<tr>`);
        for(let i=0;i<section.blocks.length;i++){
            const b=section.blocks[i];
            if(!b){continue}
            await blockToEmailHtmlAsync(ctx,options,b,address+'_'+i,(cols[c]??1)/total,out,style,model,container,section);
            c++;
            if(c>=len){
                c=0;

            }
        }

        while(c && c<cols.length-1){
            out.push('<td style="font-size:0px;margin:0px;padding:0px">&nbsp;</td>');
            c++;
        }
    }else{
        //out.push(`<tr${getTemplateBoxStyle(section)}>`);
        out.push('<td style="font-size:0;margin:0px;padding:0px">&nbsp;</td>');
    }

    //out.push('</tr></tbody></table></td></tr>\n\n');

    out.push('</tr></tbody></table>')
    close();
}

const blockToEmailHtmlAsync=async (ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions,block:TemplateBlock,address:string,colRatio:number,out:string[],style:string[],model:TemplateModel,container:TemplateContainer,section:TemplateSection)=>{

    out.push(`<td class="${cn(escapeHtml(address),block.className)}"${getTemplateBoxStyle(block,`width:${100*colRatio}%;`)}>`);

    for(let i=0;i<block.items.length;i++){
        const item=block.items[i];
        if(!item){continue}
        await itemToEmailHtmlAsync(ctx,options,item,address+'_'+i,out,style,model,container,section,block);
    }

    out.push('</td>');

}

const replaceUrl=(url:string,ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions,item:TemplateItem|null):string=>{
    if(!url || url.startsWith('data:')){
        return url;
    }
    url=replaceTemplateVars(url,options.varCtx);
    if(item){
        let utmObj=item;
        if(!item.utmSource && options.message?.automationId!==undefined){
            utmObj={...utmObj,utmSource:`${options.message.automationId}-${options.message.automationNodeId}`}
        }
        if(!item.utmCampaign && options.message?.templateId!==undefined){
            utmObj={...utmObj,utmCampaign:`${options.message?.templateId}`}
        }
        url=formatUtmLink(url,utmObj);
    }
    if(options.urlReplacer){
        url=options.urlReplacer(url,item,ctx,options);
    }
    if(options.enableTrackingProxies){
        url=defaultTrackingProxyUrlReplacer(url,item,ctx,options);
    }
    return url;
}

// eslint-disable-next-line no-useless-escape
const urlReg=/\[([^\]]*)\]\(([^\)]+)\)/g;
const inlineStrReg=/\s*["'].*/
const formatMd=(
    md:string,
    format:MarkdownOutputFormat|MarkdownOutputOptions,
    mdParseOptions:MarkdownParsingOptions|undefined,
    ctx:TemplateBuilderContext,
    options:TemplateModelHtmlOptions,
    item:TemplateItem|null
):string=>{
    md=md.replace(urlReg,(_,title:string,url:string)=>`[${title}](${replaceUrl(url.replace(inlineStrReg,''),ctx,options,item)})`);
    return formatMarkdown(md,format,mdParseOptions);
}

const itemToEmailHtmlAsync=async (ctx:TemplateBuilderContext,options:TemplateModelHtmlOptions,item:TemplateItem,address:string,out:string[],style:string[],model:TemplateModel,container:TemplateContainer,section:TemplateSection,block:TemplateBlock)=>{

    out.push(`<div class="${escapeHtml(cn(address,item.foregroundColor?'__template-inherit-color__':undefined,item.className))}"${getTemplateBoxStyle(
        item,
        'width:100%;'+(item.alignment?`text-align:${item.alignment}`:''),
        {
            ignoreBorderRadius:true,
            ignorePadding:item.type==='table' || item.type==='button' || item.type==='textInput',
            ignoreSize:item.type==='button' || item.type==='textInput',
            ignoreBorder:item.type==='table' || item.type==='hr' || item.type==='button' || item.type==='textInput',
            ignoreBackground:item.type==='table',
        }
    )}>`)

    const wrapInLink=(item.linkUrl && item.type!=='button')?true:false;

    if(wrapInLink){
        out.push(`<a href="${escapeHtml(replaceUrl(item.linkUrl??'',ctx,options,item))}" style="${item.type==='image'?'width:100%;':''}" target="_blank">`);
    }

    switch(item.type){

        case 'text':
        case 'header':{
            const level=Math.min(6,Math.max(1,item.headerLevel??1));
            if(item.type==='header'){
                out.push(`<h${level}>`);
            }
            if(item.markdown){
                out.push(formatMd(
                    replaceTemplateVars(item.markdown,options.varCtx),
                    {format:'html',singleLine:item.type==='header',getNodeHtmlAtts:(line,node,prop)=>{
                        if(prop==='link' && item.foregroundColor){
                            return { style: `color:${item.foregroundColor};`};
                        } return null;}
                    },
                    {parseMarkup:true},
                    ctx,options,item
                ));
            }else if(item.text){
                out.push(escapeHtml(replaceTemplateVars(item.text,options.varCtx)));
            }
            if(item.type==='header'){
                out.push(`</h${level}>`);
            }
            break;
        }

        case 'image':
            // todo - add file id support
            const stripPx = (value: string | undefined): string => {
                if (!value) return '';
                return value.endsWith('px') ? value.slice(0, -2) : value;
            };
            const maxWidthValue = stripPx(item.maxWidth);
            const heightValue = stripPx(item.height);
            out.push(`<img ${maxWidthValue ? `width="${maxWidthValue}"` : 'width="100%"'} ${heightValue ? `height="${heightValue}"` : ''}  style="display:inline-block;width:100%${
                item.maxWidth?`;max-width:${item.maxWidth}`:''
            }${
                item.height?`;height:${item.height};object-fit:cover;`:''
            }${
                item.borderRadius?`;border-radius:${item.borderRadius}`:''
            }" src="${
                escapeHtml(replaceUrl(item.url??defaultTemplateUrl,ctx,options,item))
            }" alt="${
                escapeHtml(item.description??item.url??'description')
            }" />`);
            break;

        case 'button':{
            const isLink=!options.enableButtonActions || item.action==='link';
            const paddingProp=isLink?'margin':'padding';
            const paddingStyle=`${
                item.paddingLeft?`${paddingProp}-left:${escapeHtml(item.paddingLeft)};`:''
            }${
                item.paddingRight?`${paddingProp}-right:${escapeHtml(item.paddingRight)};`:''
            }${
                item.paddingTop?`${paddingProp}-top:${escapeHtml(item.paddingTop)};`:''
            }${
                item.paddingBottom?`${paddingProp}-bottom:${escapeHtml(item.paddingBottom)};`:''
            }`;
            const textStyle=`${
                item.foregroundColor?`color:${escapeHtml(item.foregroundColor)};`:''
            }${
                item.fontSize?`font-size:${escapeHtml(item.fontSize)};`:''
            }`
            const buttonStyle=`${
                item.borderRadius?`border-radius:${escapeHtml(item.borderRadius)};`:''
            }${
                item.primaryColor?`background-color:${escapeHtml(item.primaryColor)};`:''
            }${textStyle}${
                item.alignment===undefined?`width:100%;`:''
            }${
                item.borderTopWidth?`border-width:${
                    escapeHtml(item.borderTopWidth)
                };border-color:${
                    escapeHtml(item.borderTopColor??'#000000')
                };border-style:${
                    escapeHtml(item.borderTopStyle??'solid')
                };`:''
            }`
            if(isLink){
                const linkUrl=item.url?escapeHtml(replaceUrl(item.url,ctx,options,item)):'#';
                out.push(`<a class="email-button" target="_blank" style="${item.alignment===undefined?`width:100%;`:''}" href="${
                        linkUrl
                    }"${
                        item.description?` title="${escapeHtml(item.description)}"`:''
                    }>`
                )
                out.push(
                    tableContainer({
                        top:item.marginTop,
                        bottom:item.marginBottom,
                        left:item.marginLeft,
                        right:item.marginRight,
                        style:`background-color:${block.bgColor||section.bgColor||container.bgColor||model.bgColor||'transparent'}${(item.alignment===undefined?';width:100%':'')}`,
                        content:tableContainer({
                            border:(item.borderTopWidth || item.borderBottomWidth || item.borderLeftWidth || item.borderRightWidth)?true:false,
                            style:buttonStyle+(item.alignment===undefined?';text-align:center':''),
                            top:item.paddingTop||(defaultButtonPadding+'px'),
                            bottom:item.paddingBottom||(defaultButtonPadding+'px'),
                            left:item.paddingLeft||(defaultButtonPadding+'px'),
                            right:item.paddingRight||(defaultButtonPadding+'px'),
                            content:`<a target="_blank" style="text-decoration:none;display:inline;${textStyle}" href="${linkUrl}">${(
                                item.markdown?
                                    formatMd(replaceTemplateVars(item.markdown,options.varCtx),'plain',undefined,ctx,options,item)
                                :item.text?
                                    escapeHtml(replaceTemplateVars(item.text,options.varCtx))
                                :
                                    ''
                            )}</a>`

                        })
                    })
                );
                out.push('</a>');
            }else{
                out.push(`<button class="email-button" style="${buttonStyle}${paddingStyle}" data-helios-button-id="${
                        item.tid
                    }"${
                        item.description?` title="${escapeHtml(item.description)}"`:''
                    }>`
                );
                if(item.markdown){
                    out.push(formatMd(replaceTemplateVars(item.markdown,options.varCtx),'plain',undefined,ctx,options,item));
                }else if(item.text){
                    out.push(escapeHtml(replaceTemplateVars(item.text,options.varCtx)));
                }
                out.push('</button>');
            }
            break;
        }

        case 'hr':
            out.push(`<hr class="${escapeHtml(address)}" style="border-top-width:${escapeHtml(item.borderTopWidth??'1px')
            };border-color:${escapeHtml(
                item.bgColor??item.borderTopColor??item.foregroundColor??model.foregroundColor??'#000000'
            )}${item.borderTopStyle && item.borderTopStyle!=='solid'?
                `;border-style:${escapeHtml(item.borderTopStyle)}`
            :''}"/>`);
            break;

        case 'textInput':{
            if(item.text){
                out.push(`<label style="display:inline-block;${
                    item.labelColor?`color:${escapeHtml(item.labelColor)};`:''
                }${
                    item.labelMargin?`margin-bottom:${escapeHtml(item.labelMargin)};`:''
                }${
                    item.labelFontSize?`font-size:${escapeHtml(item.labelFontSize)};`:''
                }">${escapeHtml(item.text)}</label>`)
            }
            const inputStyle=`${
                item.borderRadius?`border-radius:${escapeHtml(item.borderRadius)};`:''
            }${
                item.primaryColor?`background-color:${escapeHtml(item.primaryColor)};`:''
            }${
                item.foregroundColor?`color:${escapeHtml(item.foregroundColor)};`:''
            }${
                item.paddingLeft?`padding-left:${escapeHtml(item.paddingLeft)};`:''
            }${
                item.paddingRight?`padding-right:${escapeHtml(item.paddingRight)};`:''
            }${
                item.paddingTop?`padding-top:${escapeHtml(item.paddingTop)};`:''
            }${
                item.paddingBottom?`padding-bottom:${escapeHtml(item.paddingBottom)};`:''
            }${
                item.fontSize?`font-size:${escapeHtml(item.fontSize)};`:''
            }${
                item.borderTopWidth?`border-width:${
                    escapeHtml(item.borderTopWidth)
                };border-color:${
                    escapeHtml(item.borderTopColor??'#000000')
                };border-style:${
                    escapeHtml(item.borderTopStyle??'solid')
                };`:''
            }`
            switch(item.inputType){
                case 'text':
                case 'email':
                case 'phone':
                case 'date':
                case 'checkbox':
                    out.push(`<input class="helios-text-input" data-helios-input-id="${
                        escapeHtml(item.tid??'')
                    }" placeholder="${
                        escapeHtml(item.placeholder??item.inputType??'text')
                    }" type="${
                        escapeHtml(item.inputType??'text')
                    }" style="${inputStyle}" ${
                        item.description?` title="${escapeHtml(item.description)}"`:''
                    }${
                        item.required?' required':''
                    }${
                        item.defaultValue?` value="${escapeHtml(item.defaultValue)}"`:''
                    }/>`)
                    break;

                case 'dropdown':
                    out.push(`<select class="helios-text-input" data-helios-input-id="${
                        escapeHtml(item.tid??'')
                    }" placeholder="${
                        escapeHtml(item.placeholder??item.inputType??'text')
                    }" type="${
                        escapeHtml(item.inputType??'text')
                    }" style="${inputStyle}" ${
                        item.description?` title="${escapeHtml(item.description)}"`:''
                    }${
                        item.required?' required':''
                    }${
                        item.defaultValue?` value="${escapeHtml(item.defaultValue)}"`:''
                    }>
                        <option value="" disabled${item.defaultValue?'':' selected'}>${escapeHtml(item.placeholder??'Select an option')}</option>
                        ${item.options?.map((o,i)=>`<option value="${i}"${item.defaultValue && item.defaultValue==o.value?' selected':''}>${escapeHtml(o.name)}</option>`).join('')}
                    </select`)
                    break;
            }

            break;
        }

        default:
            await getTemplateRenderer(item.type)?.(item,address,out,style,model,ctx);
            break;
    }

    if(wrapInLink){
        out.push(`</a>`);
    }

    out.push('</div>')



}

const hasBorder=(box:TemplateBox)=>{
    return (
        box.borderLeftWidth ||
        box.borderRightWidth ||
        box.borderTopWidth ||
        box.borderBottomWidth
    )?true:false;
}

interface GetTemplateBoxStyleOptions
{
    ignoreBorderRadius?:boolean;
    ignorePadding?:boolean;
    ignoreMargin?:boolean;
    ignoreBorder?:boolean;
    ignoreBackground?:boolean;
    ignoreSize?:boolean;
    noAtt?:boolean;
}

const getTemplateBoxStyle=(box:TemplateBox,style?:string,options?:GetTemplateBoxStyleOptions):string=>{
    const boxStyle=(
        `${box.marginTop && !options?.ignoreMargin?`margin-top:${box.marginTop};`:''
        }${box.marginBottom && !options?.ignoreMargin?`margin-bottom:${box.marginBottom};`:''
        }${box.marginLeft && !options?.ignoreMargin?`margin-left:${box.marginLeft};`:''
        }${box.marginRight && !options?.ignoreMargin?`margin-right:${box.marginRight};`:''
        }${box.paddingTop && !options?.ignorePadding?`padding-top:${box.paddingTop};`:''
        }${box.paddingBottom && !options?.ignorePadding?`padding-bottom:${box.paddingBottom};`:''
        }${box.paddingLeft && !options?.ignorePadding?`padding-left:${box.paddingLeft};`:''
        }${box.paddingRight && !options?.ignorePadding?`padding-right:${box.paddingRight};`:''
        }${box.borderLeftWidth && !options?.ignoreBorder?`border-left-width:${box.borderLeftWidth};`:''
        }${box.borderLeftColor && !options?.ignoreBorder?`border-left-color:${box.borderLeftColor};`:''
        }${(box.borderLeftStyle || box.borderLeftWidth) && !options?.ignoreBorder?`border-left-style:${box.borderLeftStyle??'solid'};`:''
        }${box.borderRightWidth && !options?.ignoreBorder?`border-right-width:${box.borderRightWidth};`:''
        }${box.borderRightColor && !options?.ignoreBorder?`border-right-color:${box.borderRightColor};`:''
        }${(box.borderRightStyle || box.borderRightWidth) && !options?.ignoreBorder?`border-right-style:${box.borderRightStyle??'solid'};`:''
        }${box.borderTopWidth && !options?.ignoreBorder?`border-top-width:${box.borderTopWidth};`:''
        }${box.borderTopColor && !options?.ignoreBorder?`border-top-color:${box.borderTopColor};`:''
        }${(box.borderTopStyle || box.borderTopWidth) && !options?.ignoreBorder?`border-top-style:${box.borderTopStyle??'solid'};`:''
        }${box.borderBottomWidth && !options?.ignoreBorder?`border-bottom-width:${box.borderBottomWidth};`:''
        }${box.borderBottomColor && !options?.ignoreBorder?`border-bottom-color:${box.borderBottomColor};`:''
        }${(box.borderBottomStyle || box.borderBottomWidth) && !options?.ignoreBorder?`border-bottom-style:${box.borderBottomStyle??'solid'};`:''
        }${box.foregroundColor?`color:${box.foregroundColor};`:''
        }${box.bgColor && !options?.ignoreBackground?`background-color:${box.bgColor};`:''
        }${box.fontSize && !options?.ignoreSize?`font-size:${box.fontSize};`:''
        }${box.fontFamily?`font-family:${box.fontFamily};`:''
        }${box.lineHeight?`line-height:${box.lineHeight};`:''
        }${(box.borderRadius && !options?.ignoreBorderRadius)?`border-radius:${box.borderRadius};`:''
        }`
    )
    if(!boxStyle && !style){
        return '';
    }
    return options?.noAtt?`${boxStyle}${style??''}`:` style="${boxStyle}${style??''}"`
}

interface TableBoxOptions
{
    outerStyle?:string;
    innerStyle?:string;
    contentStyle?:string;
    outer?:TableContainerOptions;
    inner?:TableContainerOptions;
    content?:TableContainerOptions;
    className?:string;

}
const openTableBox=(out:string[],box:TemplateBox,options?:TableBoxOptions)=>{
    const marginOptions:TableContainerOptions={autoSides:true,utilClass:'_con-outer',outerWidth:'100%',className:options?.className,top:box.marginTop,bottom:box.marginBottom,left:box.marginLeft,right:box.marginRight,style:options?.outerStyle,...options?.outer};
    openTableContainer(out,marginOptions);

    const contentOptions:TableContainerOptions={autoSides:true,utilClass:'_con-content',outerWidth:'100%',style:getTemplateBoxStyle(box,options?.contentStyle,{ignoreMargin:true,ignorePadding:true,noAtt:true,ignoreBackground:true}),contentBg:box.bgColor,...options?.content};
    openTableContainer(out,contentOptions);

    const paddingOptions:TableContainerOptions={autoSides:true,utilClass:'_con-inner',outerWidth:'100%',top:box.paddingTop,bottom:box.paddingBottom,left:box.paddingLeft,right:box.paddingRight,style:options?.innerStyle,...options?.inner};
    openTableContainer(out,paddingOptions);



    return ()=>{
        closeTableContainer(out,paddingOptions);
        closeTableContainer(out,contentOptions);
        closeTableContainer(out,marginOptions);
    }
}



export const getDefaultTemplateModel=():TemplateModel=>{
    const subject='Subject';
    const header='Header';
    const closingStatement='Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const cta='Shop Now'
    return {
        title:subject,
        bgColor:defaultTheme.backgroundColor,
        foregroundColor:defaultTheme.foregroundColor,
        primaryColor:defaultTheme.primaryColor,
        containers:[
            {
                sections:[
                    {
                        cols:[1],
                        blocks:[
                            {
                                items:[
                                    {
                                        paddingTop:defaultTemplateSpacing,
                                        type:'header',
                                        text:header
                                    },
                                    {
                                        paddingTop:defaultTemplateSpacing,
                                        type:'text',
                                        markdown:body
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cols:[1],
                        blocks:[
                            {
                                items:[
                                    {
                                        paddingTop:defaultTemplateSpacing,
                                        type:'image',
                                        url:'https://images.unsplash.com/photo-1543320485-d0d5a49c2b2e?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        borderRadius:'8px'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cols:[1],
                        blocks:[
                            {
                                items:[
                                    {
                                        paddingTop:defaultTemplateSpacing,
                                        type:'button',
                                        url:'https://gardeniq.io',
                                        text:cta,
                                        borderRadius:defaultTemplateButtonRadius
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cols:[1],
                        blocks:[
                            {
                                items:[
                                    {
                                        paddingTop:defaultTemplateSpacing,
                                        type:'text',
                                        markdown:closingStatement,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    // return {
    //     bgColor:defaultTheme.backgroundColor,
    //     foregroundColor:defaultTheme.foregroundColor,
    //     primaryColor:defaultTheme.primaryColor,
    //     containers:[
    //         {
    //             sections:[
    //                 {
    //                     cols:[1],
    //                     blocks:[
    //                         {
    //                             items:[
    //                                 {
    //                                     type:'header',
    //                                     text:'Big sales event'
    //                                 },
    //                                 {
    //                                     type:'text',
    //                                     markdown:'Sales Event **starting** today'
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     cols:[1],
    //                     blocks:[
    //                         {
    //                             items:[
    //                                 {
    //                                     type:'image',
    //                                     url:'https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/example.jpg'
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     cols:[1,2],
    //                     blocks:[
    //                         {
    //                             items:[
    //                                 {
    //                                     type:'text',
    //                                     markdown:'Sales Event 1'
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             items:[
    //                                 {
    //                                     type:'text',
    //                                     markdown:'Sales **Event** starting today'
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // }
}


/**
 * Returns the entities at the given address.
 * @param address {scope}-address_{containerIndex}_{sectionIndex}_{blockIndex}_{itemIndex}
 */
export const getTemplateSelectionAtAddress=(
    address:string,
    scope:string,
    model:TemplateModel
):TemplateModelSelection=>{

    const parts=address.substring(scope.length).split('_');

    const container=model.containers?.[Number(parts[1])];
    if(!container){
        return {}
    }

    const section=container.sections?.[Number(parts[2])];
    if(!section){
        return {
            type:'container',
            selected:container,
            address,
            container,
        }
    }

    const block=section?.blocks?.[Number(parts[3])];
    if(!block){
        return {
            type:'section',
            selected:section,
            address,
            container,
            section,
        }
    }

    const item=block?.items?.[Number(parts[4])];
    if(!item){
        return {
            type:'block',
            selected:block,
            address,
            container,
            section,
            block
        }
    }else{
        return {
            type:'item',
            selected:item,
            address,
            container,
            section,
            block,
            item
        }
    }

}

const addressReg=/-address_\d[\d_]*$/;
export const isTemplateAddress=(str:string):boolean=>{
    return addressReg.test(str);
}

export const getTemplateObjAddress=(obj:any,model:TemplateModel|null|undefined,scope:string):string|undefined=>{
    if(!model){
        return undefined;
    }
    for(let c=0;c<model.containers.length;c++){
        const container=model.containers[c];
        if(!container){continue}
        if(obj===container){
            return `${scope}-address_${c}`;
        }

        for(let s=0;s<container.sections.length;s++){
            const section=container.sections[s];
            if(!section){continue}
            if(obj===section){
                return `${scope}-address_${c}_${s}`;
            }

            for(let b=0;b<section.blocks.length;b++){
                const block=section.blocks[b];
                if(!block){continue}
                if(obj===block){
                    return `${scope}-address_${c}_${s}_${b}`;
                }

                for(let i=0;i<block.items.length;i++){
                    const item=block.items[i];
                    if(!item){continue}
                    if(obj===item){
                        return `${scope}-address_${c}_${s}_${b}_${i}`;
                    }

                }
            }
        }
    }
    return undefined;
}

export const addTemplateItem=(
    addItem:TemplateItem,
    model:TemplateModel,
    nextToItem:TemplateItem,
    side:Side
):boolean=>{
    const m=getTemplateEntities(nextToItem,model);
    if(!m){
        return false;
    }
    const {section,block}=m;
    if(side==='top' || side==='bottom'){
        if(!block){
            return false;
        }
        let i=block.items.indexOf(nextToItem);
        if(i===-1){
            return false;
        }

        if(side==='bottom'){
            i++;
        }

        const prev=block.items[i]??block.items[0];
        if(prev){
            if(!addItem.paddingLeft){
                addItem.paddingLeft=prev.paddingLeft;
            }
            if(!addItem.paddingRight){
                addItem.paddingRight=prev.paddingRight;
            }
        }

        wArySplice(block.items,i,0,addItem);
        return true;

    }else{
        if(!section || !block){
            return false;
        }
        let i=section.blocks.indexOf(block);
        if(i===-1){
            return false;
        }
        if(side==='right'){
            i++;
        }
        if(i===0){
            const b=section.blocks[0];
            if(b){
                for(const item of b.items){
                    if(!item.paddingLeft){
                        wSetProp(item,'paddingLeft',defaultTemplateSpacing);
                    }
                }
            }
        }else if(!addItem.paddingLeft){
            addItem.paddingLeft=defaultTemplateSpacing;
        }
        wArySplice(section.blocks,i,0,{
            items:[addItem]
        })
        return true;
    }
}

export const addTemplateSection=(
    addSection:TemplateSection|TemplateSection[]|true,
    model:TemplateModel,
    nextToItem:TemplateSection,
    side:Side,
    addItem?:TemplateItem
):TemplateSection[]|null=>{
    const m=getTemplateEntities(nextToItem,model);
    if(!m){
        return null;
    }
    const {container,section}=m;

    if(!container || !section){
        return null;
    }

    let i=container.sections.indexOf(section);
    if(i===-1){
        return null;
    }
    if(side==='bottom'){
        i++;
    }
    const sec=(typeof addSection === 'object')?addSection:{
        blocks:[
            {
                items:[addItem??{
                    type:'text',
                    markdown:'Text here',
                    paddingTop:defaultTemplateSpacing,
                }]
            }
        ]
    }
    const ary=asArray(sec)
    wArySplice(container.sections,i,0,...ary);

    return ary;
}

export const getTemplateEntities=(
    match:TemplateItem|TemplateBlock|TemplateSection|TemplateContainer,
    model:TemplateModel
):TemplateEntities|undefined=>{

    for(const container of model.containers){
        if(container===match){
            return {
                model,
                container,
            }
        }
        for(const section of container.sections){
            if(section===match){
                return {
                    model,
                    container,
                    section,
                }
            }
            for(const block of section.blocks){
                if(block===match){
                    return {
                        model,
                        container,
                        section,
                        block,
                    }
                }
                for(const item of block.items){
                    if(item===match){
                        return {
                            model,
                            container,
                            section,
                            block,
                            item,
                        }
                    }
                }
            }
        }
    }

    return undefined;

}

export const deleteTemplateItem=(
    rm:TemplateItem|TemplateBlock|TemplateSection|TemplateContainer,
    model:TemplateModel
):boolean=>{


    const m=getTemplateEntities(rm,model);
    if(!m){
        return false;
    }

    const {
        container,
        section,
        block,
    }=m;

    if(block?.items.includes(rm as any)){
        wAryRemove(block.items,rm);
        if(block.items.length===0){
            deleteTemplateItem(block,model);
        }
        return true;
    }else if(section?.blocks.includes(rm as any)){
        wAryRemove(section.blocks,rm);
        if(section.blocks.length===0){
            deleteTemplateItem(section,model);
        }
        return true;
    }else if(container?.sections.includes(rm as any)){
        wAryRemove(container.sections,rm);
        if(container.sections.length===0){
            deleteTemplateItem(container,model);
        }
        return true;
    }else{
        return false;
    }
}

export const cloneTemplateItem=(
    obj:TemplateItem|TemplateBlock|TemplateSection|TemplateContainer,
    model:TemplateModel
):TemplateItem|TemplateBlock|TemplateSection|TemplateContainer|null=>{


    const m=getTemplateEntities(obj,model);
    if(!m){
        return null;
    }

    const {
        container,
        section,
        block,
        item
    }=m;

    if(obj===item){
        if(block){
            const clone=deepClone(item);
            wArySplice(block.items,block.items.indexOf(item)+1,0,clone);
            return clone;
        }else{
            return null;
        }
    }else if(obj===block){
        if(section){
            const clone=deepClone(block);
            wArySplice(section.blocks,section.blocks.indexOf(block)+1,0,clone);
            return clone;
        }else{
            return null;
        }
    }else if(obj===section){
        if(container){
            const clone=deepClone(section);
            wArySplice(container.sections,container.sections.indexOf(section)+1,0,clone);
            return clone;
        }else{
            return null;
        }
    }else if(obj===container){
        const clone=deepClone(container);
        wArySplice(model.containers,model.containers.indexOf(container)+1,0,clone);
        return clone;
    }else{
        return null;
    }
}

export interface TemplateToImageOptions
{
    model:TemplateModel;
    form?:FormRecord;
    canvasWidth?:number;
    imageWidth?:number;
}

export const templateToImageBlobAsync=async ({
    model,
    form,
    canvasWidth=800,
    imageWidth=350,
}:TemplateToImageOptions):Promise<Blob|null>=>{

    const container=globalThis.document?.createElement('div');
    const div=globalThis.document?.createElement('div');
    if(!div || !container){
        return null;
    }
    container.style.position='absolute';
    container.style.width=`${canvasWidth}px`;
    container.style.top='0';
    container.style.left='0';
    container.style.pointerEvents='none';
    container.style.opacity='0';
    div.style.width=`${canvasWidth}px`;
    container.append(div);
    const urlPrefix=`https://${formatBucketName(mediaBucketParam())}.s3.amazonaws.com/`
    div.innerHTML=await templateModelToEmailHtmlAsync(model,{
        form,
        inline:true,
        scope:'_'+uuid(),
        urlReplacer:url=>{
            if(url.startsWith(urlPrefix)){
                return process.env['NODE_ENV']==='production'?
                    url.substring(urlPrefix.length-1):
                    `/api/proxy?url=${encodeURIComponent(url)}`;
            }else{
                return url;
            }
        }
    });
    try{
        globalThis.document.body.append(container);

        const blob=await import('html-to-image').then(m=>m.toBlob(div,{
            type:'image/jpg',
            quality:0.7,
            canvasWidth:imageWidth,
            canvasHeight:Math.round(div.clientHeight*(imageWidth/div.clientWidth))
        }));


        return blob;
    }finally{
        container.remove();
    }
}

export interface UploadTemplateImageOptions extends TemplateToImageOptions
{
    uuid:string;
}

export const uploadTemplateImageAsync=async ({
    uuid,
    ...options
}:UploadTemplateImageOptions):Promise<string|null>=>{
    try{
        const blob=await templateToImageBlobAsync(options);
        if(!blob){
            return null;
        }

        const key=`message-template-preview/${uuid}`;

        await s3Client().putAsync(mediaBucketParam(),key,blob);

        return `https://${formatBucketName(mediaBucketParam())}.s3.amazonaws.com/${key}`
    }catch(ex){
        console.error('upload template image failed',ex);
        return null;
    }
}

export const getTemplateItemById=(id:string,model:TemplateModel):TemplateItem|undefined=>{
    for(const c of model.containers){
        for(const s of c.sections){
            for(const b of s.blocks){
                for(const i of b.items){
                    if(i.tid===id){
                        return i;
                    }
                }
            }
        }
    }
    return undefined;
}

export const getTemplateItemByIdFromTemplates=(id:string,templates:MessageTemplate[]|null|undefined):TemplateItem|undefined=>{
    if(!templates){
        return undefined;
    }
    for(const m of templates){
        let item:TemplateItem|undefined;

        if(m.formTemplateModel && (item=getTemplateItemById(id,m.formTemplateModel))){
            return item;
        }

        if(m.emailTemplateModel && (item=getTemplateItemById(id,m.emailTemplateModel))){
            return item;
        }

        if(m.smsTemplateModel && (item=getTemplateItemById(id,m.smsTemplateModel))){
            return item;
        }

        if(m.notiticationTemplateModel && (item=getTemplateItemById(id,m.notiticationTemplateModel))){
            return item;
        }

        if(m.textTemplateModel && (item=getTemplateItemById(id,m.textTemplateModel))){
            return item;
        }

        if(m.emailTextTemplateModel && (item=getTemplateItemById(id,m.emailTextTemplateModel))){
            return item;
        }
    }
    return undefined;
}

export const regenerateTemplateEntityIds=(msg:MessageTemplate)=>{
    if(msg.formTemplateModel){
        regenerateTemplateModelEntityIds(msg.formTemplateModel);
    }
    if(msg.emailTemplateModel){
        regenerateTemplateModelEntityIds(msg.emailTemplateModel);
    }
    if(msg.smsTemplateModel){
        regenerateTemplateModelEntityIds(msg.smsTemplateModel);
    }
    if(msg.notiticationTemplateModel){
        regenerateTemplateModelEntityIds(msg.notiticationTemplateModel);
    }
    if(msg.textTemplateModel){
        regenerateTemplateModelEntityIds(msg.textTemplateModel);
    }
    if(msg.emailTextTemplateModel){
        regenerateTemplateModelEntityIds(msg.emailTextTemplateModel);
    }
}
export const regenerateTemplateModelEntityIds=(model:TemplateModel)=>{
    if(model.tid){
        model.tid=shortUuid();
    }

    for(const c of model.containers){
        if(c.tid){
            c.tid=shortUuid();
        }
        for(const s of c.sections){
            if(s.tid){
                s.tid=shortUuid();
            }
            for(const b of s.blocks){
                if(b.tid){
                    b.tid=shortUuid();
                }
                for(const i of b.items){
                    if(i.tid){
                        i.tid=shortUuid();
                    }
                }
            }
        }
    }

}

interface TableContainerOptions
{
    top?:string;
    bottom?:string;
    left?:string;
    right?:string;
    style?:string;
    border?:boolean;
    noLeft?:boolean;
    noRight?:boolean;
    noTop?:boolean;
    noBottom?:boolean;
    width?:string;
    outerWidth?:string;
    className?:string;
    utilClass?:string;
    autoSides?:boolean;
    contentBg?:string;
}

const tableContainer=(options:TableContainerOptions & {content:string})=>{
    const out:string[]=[];
    openTableContainer(out,options);
    out.push(options.content);
    closeTableContainer(out,options);
    return out.join('');

}

const openTableContainer=(out:string[],{
    border,
    style='',
    autoSides,
    top=autoSides?'':'0px',
    bottom=autoSides?'':'0px',
    left=autoSides?'':'0px',
    right=autoSides?'':'0px',
    noLeft=(left==='' || left==='0' || left==='0px') && !autoSides,
    noRight=(right==='' || right==='0' || right==='0px') && !autoSides,
    noTop=top==='' || top==='0' || top==='0px',
    noBottom,
    outerWidth,
    width,
    className,
    utilClass,
    contentBg,
}:TableContainerOptions)=>{
    out.push(
`<table class="${utilClass??'_con'}${className?` ${className}`:''}" cellpadding="0" cellspacing="0" style="max-width:100%;margin:0px;padding:0px;position:relative;${outerWidth?`width:${outerWidth};`:''}${border?'':'border-width:0px;border-collapse:collapse;'}${style}"${border?'':' border="0"'}>
    ${noTop?'':`<tr style="margin:0px;padding:0px">
        ${noLeft?'':`<td style="font-size:0px;margin:0px;padding:0px">&nbsp;</td>`}
        <td style="font-size:0px;margin:0px;padding:0px;${top?`height:${top}`:''}">&nbsp;</td>
        ${noRight?'':`<td style="font-size:0px;">&nbsp;</td>`}
    </tr>`}
    <tr style="margin:0px;padding:0px">
        ${noLeft?'':`<td style="font-size:0px;margin:0px;padding:0px;${left?`width:${left}`:''}">&nbsp;</td>`}
        <td class="__container-width-wrapper" style="${contentBg?`background-color:${contentBg};`:''}margin:0px;padding:0px;position:relative;${width?`;width:${width};max-width:${width};`:''}">${width?`<div class="__container-width-wrapper" style="margin:0px;padding:0px;position:relative;width:${width};max-width:${width}">`:''}`
    )
}

const closeTableContainer=(out:string[],{
    border,
    style='',
    autoSides,
    top=autoSides?'':'0px',
    bottom=autoSides?'':'0px',
    left=autoSides?'':'0px',
    right=autoSides?'':'0px',
    noLeft=(left==='' || left==='0' || left==='0px') && !autoSides,
    noRight=(right==='' || right==='0' || right==='0px') && !autoSides,
    noTop,
    noBottom=bottom==='' || bottom==='0' || bottom==='0px',
    width
}:TableContainerOptions)=>{
    out.push(
`       ${width?'</div>':''}</td>
        ${noRight?'':`<td style="font-size:0px;margin:0px;padding:0px;${right?`width:${right}`:''}">&nbsp;</td>`}
    </tr>
    ${noBottom?'':`<tr style="margin:0px;padding:0px">
        ${noLeft?'':`<td style="font-size:0px;margin:0px;padding:0px">&nbsp;</td>`}
        <td style="font-size:0px;margin:0px;padding:0px;${bottom?`height:${bottom}`:''}">&nbsp;</td>
        ${noRight?'':`<td style="font-size:0px;margin:0px;padding:0px">&nbsp;</td>`}
    </tr>`}
</table>`
    )
}
