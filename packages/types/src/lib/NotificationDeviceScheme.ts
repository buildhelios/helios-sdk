/* <ALLOW_AUTO_DELETE DEPENDENCIES="NotificationDevice" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { MessageTargetScheme } from './MessageTargetScheme';

const __base__NotificationDeviceScheme=z.object({
    id:z.number().int(),
    profileId:z.number().int().optional(),
    userId:z.number().int().optional(),
});
const __lazy__NotificationDeviceScheme=z.object({
    targetedMessages:z.lazy(()=>MessageTargetScheme).array().optional(),
});
export const NotificationDeviceScheme:(typeof __base__NotificationDeviceScheme)=__base__NotificationDeviceScheme.merge(__lazy__NotificationDeviceScheme) as any;
