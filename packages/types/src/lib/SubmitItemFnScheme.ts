/* <ALLOW_AUTO_DELETE DEPENDENCIES="SubmitItemFn" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__invokeSubmitItemFnFunctionArgsScheme=z.object({
    input:z.any(),
});
const __lazy__invokeSubmitItemFnFunctionArgsScheme=z.object({
});
export const invokeSubmitItemFnFunctionArgsScheme:(typeof __base__invokeSubmitItemFnFunctionArgsScheme)=__base__invokeSubmitItemFnFunctionArgsScheme.merge(__lazy__invokeSubmitItemFnFunctionArgsScheme) as any;
