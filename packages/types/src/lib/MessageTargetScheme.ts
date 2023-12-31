/* <ALLOW_AUTO_DELETE DEPENDENCIES="MessageTarget" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__MessageTargetScheme=z.object({
    id:z.number().int(),
    deliveryId:z.number().int(),
    email:z.string().email().optional(),
    phone:z.string().max(255).optional(),
    deviceId:z.number().int().optional(),
    profileId:z.number().int().optional(),
    userId:z.number().int().optional(),
});
const __lazy__MessageTargetScheme=z.object({
});
export const MessageTargetScheme:(typeof __base__MessageTargetScheme)=__base__MessageTargetScheme.merge(__lazy__MessageTargetScheme) as any;
