/* <ALLOW_AUTO_DELETE DEPENDENCIES="UpdateDomainFn" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { UpdateDomainRequestScheme } from './UpdateDomainRequestScheme';

const __base__invokeUpdateDomainFnFunctionArgsScheme=z.object({
});
const __lazy__invokeUpdateDomainFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>UpdateDomainRequestScheme),
});
export const invokeUpdateDomainFnFunctionArgsScheme:(typeof __base__invokeUpdateDomainFnFunctionArgsScheme)=__base__invokeUpdateDomainFnFunctionArgsScheme.merge(__lazy__invokeUpdateDomainFnFunctionArgsScheme) as any;
