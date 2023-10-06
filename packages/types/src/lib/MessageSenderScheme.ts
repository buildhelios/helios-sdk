/* <ALLOW_AUTO_DELETE DEPENDENCIES="MessageSender" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { MessageTemplateScheme } from './MessageTemplateScheme';

const __base__MessageSenderScheme=z.object({
    id:z.number().int(),
    isDefault:z.boolean().optional(),
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    emailVerified:z.boolean().optional(),
    phone:z.string().max(255).optional(),
    phoneVerified:z.boolean().optional(),
    website:z.string().max(255).optional(),
    accountId:z.number().int().optional(),
});
const __lazy__MessageSenderScheme=z.object({
    messageTemplates:z.lazy(()=>MessageTemplateScheme).array().optional(),
});
export const MessageSenderScheme:(typeof __base__MessageSenderScheme)=__base__MessageSenderScheme.merge(__lazy__MessageSenderScheme) as any;
