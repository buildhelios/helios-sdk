/* <ALLOW_AUTO_DELETE DEPENDENCIES="SendDiscountFn" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { DiscountMessageRequestScheme } from './DiscountMessageRequestScheme';

const __base__invokeSendDiscountFnFunctionArgsScheme=z.object({
}).describe("Sends a discount message to the target user");
const __lazy__invokeSendDiscountFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>DiscountMessageRequestScheme),
});
export const invokeSendDiscountFnFunctionArgsScheme:(typeof __base__invokeSendDiscountFnFunctionArgsScheme)=__base__invokeSendDiscountFnFunctionArgsScheme.merge(__lazy__invokeSendDiscountFnFunctionArgsScheme) as any;