/* <ALLOW_AUTO_DELETE DEPENDENCIES="SubmitProfileDataRequestFn" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__invokeSubmitProfileDataRequestFnFunctionArgsScheme=z.object({
    input:z.any(),
});
const __lazy__invokeSubmitProfileDataRequestFnFunctionArgsScheme=z.object({
});
export const invokeSubmitProfileDataRequestFnFunctionArgsScheme:(typeof __base__invokeSubmitProfileDataRequestFnFunctionArgsScheme)=__base__invokeSubmitProfileDataRequestFnFunctionArgsScheme.merge(__lazy__invokeSubmitProfileDataRequestFnFunctionArgsScheme) as any;
