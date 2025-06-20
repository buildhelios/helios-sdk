/* <ALLOW_AUTO_DELETE DEPENDENCIES="SocialItem" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { SocialTypeScheme } from './SocialTypeScheme';

const __base__SocialItemScheme=z.object({
    link:z.string(),
    disabled:z.boolean().optional(),
});
const __lazy__SocialItemScheme=z.object({
    type:z.lazy(()=>SocialTypeScheme),
});
export const SocialItemScheme:(typeof __base__SocialItemScheme)=__base__SocialItemScheme.merge(__lazy__SocialItemScheme) as any;
