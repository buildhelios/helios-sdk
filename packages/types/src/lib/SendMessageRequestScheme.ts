/* <ALLOW_AUTO_DELETE DEPENDENCIES="SendMessageRequest" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__SendMessageRequestScheme=z.object({
    email:z.string().email(),
});
const __lazy__SendMessageRequestScheme=z.object({
});
export const SendMessageRequestScheme:(typeof __base__SendMessageRequestScheme)=__base__SendMessageRequestScheme.merge(__lazy__SendMessageRequestScheme) as any;
