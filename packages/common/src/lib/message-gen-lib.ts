import { MessageTemplateTable } from "@buildhelios/sql-tables";
import { Account, FileRecord, MessageTemplate, TemplateModel, TemplateModelScheme, TemplateSection } from "@buildhelios/types";
import { Conversation, escapeConvo } from "@convo-lang/convo-lang";
import { atDotCss } from "@iyio/at-dot-css";
import { Query, delayAsync, log, queryClient, wDeleteProp, wSetProp } from "@iyio/common";
import { z } from "zod";
import { generateImageAsync } from "./image-gen-lib";
import { layout3x2Example, messageGenExamples } from "./message-gen-examples";
import { accountVars, profileVars } from "./profile-field-lib";

export interface GenerateMessageTemplateOptions
{
    account:Account;
    description:string;
    generateImages?:boolean;
    srcTemplateId?:number;
    /**
     * Called before generating images
     */
    onTemplate?:(template:TemplateModel)=>void;
}
export const generateMessageTemplateAsync=async (options:GenerateMessageTemplateOptions):Promise<TemplateModel>=>{

    let error=null;

    for(let i=0;i<5;i++){
        try{
            return await _generateMessageTemplateAsync(options);
        }catch(ex){
            log.warn('Failed to generate message template. Will try again',ex);
            error=ex;
            await delayAsync(2000);
        }
    }

    log.error('Failed to generate message template',error);
    throw error;

}
const getEmbedQuery=(type:string):Query=>({
    table:MessageTemplateTable.name,
    condition:{
        op:'and',
        conditions:[
            {
                left:{col:'isDraft'},
                op:'=',
                right:{value:false}
            },
            {
                left:{col:'isEmbed'},
                op:'=',
                right:{value:true}
            },
            {
                left:{col:'embedType'},
                op:'=',
                right:{value:type}
            },
        ]
    },
    limit:1,
})

const _generateMessageTemplateAsync=({
    account,
    description,
    generateImages,
    onTemplate,
    srcTemplateId,
}:GenerateMessageTemplateOptions):Promise<TemplateModel>=>{

    return new Promise<TemplateModel>(async (resolve,reject)=>{
        try{

            const [[header],[footer],[srcTemplate]]=await Promise.all([
                queryClient().selectQueryItemsAsync<MessageTemplate>(getEmbedQuery('header')),
                queryClient().selectQueryItemsAsync<MessageTemplate>(getEmbedQuery('footer')),
                srcTemplateId?queryClient().selectQueryItemsAsync<MessageTemplate>({
                    table:MessageTemplateTable.name,
                    condition:{
                        left:{col:'id'},
                        op:'=',
                        right:{value:srcTemplateId}
                    }
                }):[]
            ]);

            console.log('hio 👋 👋 👋 SRC Template',srcTemplate);

            const conversation=new Conversation({

            });

            let template:TemplateModel|undefined;

            conversation.defineFunction({
                name:'createMessageTemplate',
                paramsType:z.object({template:TemplateModelScheme}),
                callback:(v:{template:TemplateModel})=>{
                    template=v.template;
                }
            })

            conversation.append(/*convo*/`
> system
You are helping a user generate message templates.

## Message Template Structure
A message template is divided into containers the contain related groups of content in the form
of sections. Each section is laid out as a row with columns that are made up of Blocks. Each block
is a column containing items that are stacked on top of each other.

Follow the following instructions unless specifically told otherwise:
<default-instructions>
- Only define 1 container and group related content using sections.
- When defining sections include a text header, text body and call-to-action button with a link to "https://example.com"
- Include at lease 1 image
- Separate sections with 32px of top margin or more
- Sections should have at lease 10px of padding
- Separate items such as text, buttons, links and images with 16px of top margin or more
- It is preferred to set the background color of the container instead of setting the background of individual sections
- Apply a border radius to images, links and buttons based on the border radius of the theme below
- Use template variables to insert user personation data
</default-instructions>

Use the "bgColor" prop to define the background colors.

When defining border, margin and padding properties you must specify all sides individually. See the
example below.

Border Example:
<example>
    {
        "borderTopWidth":"1px",
        "borderTopColor":"#cccccc",
        "borderBottomWidth":"1px",
        "borderBottomColor":"#cccccc",
        "borderLeftWidth":"1px",
        "borderLeftColor":"#cccccc",
        "borderRightWidth":"1px",
        "borderRightColor":"#cccccc",
    }
</example>

Padding Example:
<example>
    {
        "paddingTop":"1px",
        "paddingBottom":"1px",
        "paddingLeft":"1px",
        "paddingRight":"1px",
    }
</example>

Margin Example:
<example>
    {
        "marginTop":"1px",
        "marginBottom":"1px",
        "marginLeft":"1px",
        "marginRight":"1px",
    }
</example>

## Images
When defining images either use images from the media library or define an image with an empty URL
and a short description of what the image should look like, the description will be used to generate
a new image.

Below is an example of an image that will be generated based on it's description:
<generated-image-example>
{
    "type": "image",
    "url": "",
    "description": "Cat playing with yarn"
}
</generated-image-example>

## Variables
Variables can be inserted into the text and markdown properties of items to personalize templates. Template variables
use are enclosed with double curly brackets.

<variable-example>
{
    "type": "text",
    "markdown": "Hi \\{{profile.name}}, Boy do we have a deal for you."
}
</variable-example>

Below are all available template variables:
<template-variables>
${profileVars.map(v=>v.path).join('\n')}
${accountVars.map(v=>v.path).join('\n')}
</template-variables>

## Account Info
Use the following account information for context:
<account-info>
    Name: ${escapeConvo(account.name)}
    Industry: ${escapeConvo(account.industry??'')}
    URL: ${escapeConvo(account.websiteUrl)}
    Terms URL: ${escapeConvo(account.termsUrl)}
    Privacy Policy URL: ${escapeConvo(account.privacyPolicyUrl)}
    Description:
    <company-description>
        ${escapeConvo(account.description)}
    </company-description>
    Address: ${escapeConvo(`${account.address}, ${account.city}, ${account.state}, ${account.postalCode}`)}
    TimeZone: ${escapeConvo(`${account.timezone}`)}
</account-info>

## Grid Layout
When creating grid layouts use sections to define rows and blocks to define cells in the rows.

3 column by 2 row grid layout example.
<example>
Sections:
${escapeConvo(JSON.stringify(layout3x2Example))}
</example>

Do not simply create grid layouts using a single image.

## Theme
Use the following theme data to style messages
<theme>
${JSON.stringify(account.theme??null)}
</theme>

${account.llmProperties?.defaultConvo?/*convo*/`
## User Instructions
Take into account the following user instructions:
<user-instructions>
${account.llmProperties.defaultConvo}
</user-instructions>
`:''}

${account.llmProperties?.messageBuilderConvo?/*convo*/`
## Message building instructions
Take into account the following instructions when creating message templates:
<message-building-instructions>
${account.llmProperties?.messageBuilderConvo}
</message-building-instructions>
`:''}

${header && !srcTemplate?/*convo*/`
Do not include a header. The following header will be added to your response.
Header:
<header>
${escapeConvo(JSON.stringify(header.emailTemplateModel?.containers?.[0]??null))}
</header>`:''}

${footer && !srcTemplate?/*convo*/`
Do not include a footer. The following footer will be added to your response.
Footer:
<footer>
${escapeConvo(JSON.stringify(footer.emailTemplateModel?.containers?.[0]??null))}
</footer>`:''}

The current date and time is: {{dateTime()}}

Below are examples of Message templates:
${messageGenExamples.map<string>(m=>`
<example>
Name: ${escapeConvo(m.name)}
Description: ${escapeConvo(m.description)}
Template: ${escapeConvo(JSON.stringify(m.model))}
</example>
`).join('\n\n')}

@call
> user
${srcTemplate?'Update the copy of the source-template based on the following input. Include at lease one template variable. Do not change structure of the template, only update text or markdown property of text, button and header items.':'Generate a new message template based on the following input'}
:

<input>
${escapeConvo(description)}
</input>

${srcTemplate?/*convo*/`

<source-template>
${escapeConvo(JSON.stringify(srcTemplate.emailTemplateModel??null))}
</source-template>`:''}
            `);

            await conversation.completeAsync({returnOnCalled:true});

            if(!template){
                reject('template generation function not called by LLM');
                return;
            }

            const mainContainer=template.containers[0];
            if(mainContainer && !srcTemplate){
                if(header?.emailTemplateModel?.containers){
                    const head:TemplateSection[]=[];
                    for(const c of header.emailTemplateModel.containers){
                        head.push(...c.sections);
                    }
                    mainContainer.sections.unshift(...head);
                }

                if(footer?.emailTemplateModel?.containers){
                    for(const c of footer.emailTemplateModel.containers){
                        mainContainer.sections.push(...c.sections);
                    }
                }
            }

            onTemplate?.(template);

            if(generateImages){
                await generateImagesForTemplateAsync({template,account,purpose:description,applyChangesToTemplate:true});
            }

            resolve(template);

        }catch(ex){
            reject(ex);
        }

    });
}

export interface GenerateImagesForTemplateOptions
{
    template:TemplateModel;
    account:Account;
    purpose?:string;
    applyChangesToTemplate?:boolean;
}
export const generateImagesForTemplateAsync=async ({
    template,
    account,
    purpose,
    applyChangesToTemplate,
}:GenerateImagesForTemplateOptions):Promise<FileRecord[]>=>{

    const genRequest:Promise<FileRecord>[]=[];

    for(const c of template.containers){
        if(!c.sections){
            continue;
        }
        for(const s of c.sections){
            if(!s.blocks){
                continue;
            }
            for(const b of s.blocks){
                if(!b.items){
                    continue;
                }
                for(const item of b.items){
                    if(item.type!=='image' || item.url || !item.description?.trim()){
                        continue;
                    }
                    if(applyChangesToTemplate){
                        wSetProp(item,'url',transparentPng);
                        wSetProp(item,'className',style.loading());
                    }
                    genRequest.push((async ()=>{
                        const file=await generateImageAsync({description:item.description??''});
                        if(applyChangesToTemplate){
                            wSetProp(item,'url',file.mdUrl??file.smUrl??file.lgUrl??file.srcUrl);
                            wDeleteProp(item,'className');
                        }
                        return file;
                    })());
                }
            }
        }
    }

    return await Promise.all(genRequest);

}


const transparentPng=(
    'data:image/png;base64,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'
);

const style=atDotCss({name:'message-gen-lib',css:`
    @keyframes @@@loading{
        0%{background-color:#cccccc}
        50%{background-color:#555555}
        100%{background-color:#cccccc}
    }
    @.loading{
        animation:@@@loading 4s infinite ease-in-out;
    }

`});
