/* <ALLOW_AUTO_DELETE DEPENDENCIES="CreateDomainFn" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { CreateDomainRequestScheme } from './CreateDomainRequestScheme';

const __base__invokeCreateDomainFnFunctionArgsScheme=z.object({
});
const __lazy__invokeCreateDomainFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>CreateDomainRequestScheme),
});
export const invokeCreateDomainFnFunctionArgsScheme:(typeof __base__invokeCreateDomainFnFunctionArgsScheme)=__base__invokeCreateDomainFnFunctionArgsScheme.merge(__lazy__invokeCreateDomainFnFunctionArgsScheme) as any;
