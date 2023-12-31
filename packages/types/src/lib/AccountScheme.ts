/* <ALLOW_AUTO_DELETE DEPENDENCIES="Account" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { EmailAttributionEventTypeScheme } from './EmailAttributionEventTypeScheme';
import { CurrencyScheme } from './CurrencyScheme';
import { MessageDeliveryScheme } from './MessageDeliveryScheme';
import { MessageSenderScheme } from './MessageSenderScheme';
import { MessageTemplateScheme } from './MessageTemplateScheme';
import { ApiKeyScheme } from './ApiKeyScheme';
import { ProfileScheme } from './ProfileScheme';
import { UserScheme } from './UserScheme';
import { LocationScheme } from './LocationScheme';
import { RegionScheme } from './RegionScheme';
import { EventRecordScheme } from './EventRecordScheme';

const __base__AccountScheme=z.object({
    id:z.number().int(),
    timezone:z.string().max(255),
    industry:z.string().max(255).optional(),
    mfaRequired:z.boolean().optional(),
    minProfileSendIntervalMs:z.number().int().optional().describe("The min number of milliseconds between sending messages to a single profile excluding transactional messages"),
    messageSubjectPreviewPrefix:z.string().max(255).optional(),
    placeEmailTrackingPixelAtBottom:z.boolean().optional(),
}).describe("Client accounts");
const __lazy__AccountScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
    regions:z.lazy(()=>RegionScheme).array().optional(),
    locations:z.lazy(()=>LocationScheme).array().optional(),
    users:z.lazy(()=>UserScheme).array().optional(),
    profiles:z.lazy(()=>ProfileScheme).array().optional(),
    apiKeys:z.lazy(()=>ApiKeyScheme).array().optional(),
    messageTemplates:z.lazy(()=>MessageTemplateScheme).array().optional(),
    messageSenders:z.lazy(()=>MessageSenderScheme).array().optional(),
    messageDeliveries:z.lazy(()=>MessageDeliveryScheme).array().optional(),
    currency:z.lazy(()=>CurrencyScheme),
    emailAttributionType:z.lazy(()=>EmailAttributionEventTypeScheme).optional(),
});
export const AccountScheme:(typeof __base__AccountScheme)=__base__AccountScheme.merge(__lazy__AccountScheme) as any;
