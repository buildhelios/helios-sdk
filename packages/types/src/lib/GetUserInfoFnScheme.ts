/* <ALLOW_AUTO_DELETE DEPENDENCIES="GetUserInfoFn" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__invokeGetUserInfoFnFunctionArgsScheme=z.object({
    input:z.string().max(255).describe("User id"),
});
const __lazy__invokeGetUserInfoFnFunctionArgsScheme=z.object({
});
export const invokeGetUserInfoFnFunctionArgsScheme:(typeof __base__invokeGetUserInfoFnFunctionArgsScheme)=__base__invokeGetUserInfoFnFunctionArgsScheme.merge(__lazy__invokeGetUserInfoFnFunctionArgsScheme) as any;
