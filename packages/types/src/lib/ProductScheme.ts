/* <ALLOW_AUTO_DELETE DEPENDENCIES="Product" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { EventRecordScheme } from './EventRecordScheme';

const __base__ProductScheme=z.object({
    id:z.number().int(),
    altId:z.string().max(255).optional(),
    name:z.string().max(255),
    price:z.number(),
});
const __lazy__ProductScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
});
export const ProductScheme:(typeof __base__ProductScheme)=__base__ProductScheme.merge(__lazy__ProductScheme) as any;
