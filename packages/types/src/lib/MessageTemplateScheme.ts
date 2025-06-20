/* <ALLOW_AUTO_DELETE DEPENDENCIES="MessageTemplate" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { TemplateModelScheme } from './TemplateModelScheme';
import { MessageRecordScheme } from './MessageRecordScheme';
import { CommsChannelScheme } from './CommsChannelScheme';

const __base__MessageTemplateScheme=z.object({
    id:z.number().int().describe("If not storing in the database use an id of 0"),
    uuid:z.string().max(255).optional(),
    name:z.string().max(255).optional(),
    created:z.number().optional(),
    lastUpdated:z.number().optional(),
    subject:z.string().max(255).optional(),
    accountId:z.number().int().optional(),
    iconUrl:z.string().optional(),
    published:z.boolean().optional(),
    tags:z.string().max(255).array().optional(),
    previewText:z.string().optional(),
    senderId:z.number().int().optional().describe("If not set the default sender will be used"),
    isDraft:z.boolean().optional(),
    publishId:z.number().int().optional().describe("Id of a message template that this message template is a draft of"),
    draftId:z.number().int().optional().describe("Id of a message template that this message template is a published version of"),
    customUnsubscribeLink:z.string().optional(),
    trackingEnabled:z.boolean().optional(),
    includePlatformBranding:z.boolean().optional(),
    isEmbed:z.boolean().optional().describe("If true the template can be used as an embed and embedded in other templates"),
    embedType:z.string().max(255).optional().describe("Header, footer, etc"),
    disableEmail:z.boolean().optional(),
    disableSms:z.boolean().optional(),
    disableNotification:z.boolean().optional(),
});
const __lazy__MessageTemplateScheme=z.object({
    preferredChannel:z.lazy(()=>CommsChannelScheme).optional(),
    messages:z.lazy(()=>MessageRecordScheme).array().optional(),
    emailTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
    emailTextTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
    smsTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
    notiticationTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
    textTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
    formTemplateModel:z.lazy(()=>TemplateModelScheme).optional(),
});
export const MessageTemplateScheme:(typeof __base__MessageTemplateScheme)=__base__MessageTemplateScheme.merge(__lazy__MessageTemplateScheme) as any;
