/* <ALLOW_AUTO_DELETE DEPENDENCIES="StripeCustomerCreateFn" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { AccountRegistrationScheme } from './AccountRegistrationScheme';

const __base__invokeStripeCustomerCreateFnFunctionArgsScheme=z.object({
});
const __lazy__invokeStripeCustomerCreateFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>AccountRegistrationScheme),
});
export const invokeStripeCustomerCreateFnFunctionArgsScheme:(typeof __base__invokeStripeCustomerCreateFnFunctionArgsScheme)=__base__invokeStripeCustomerCreateFnFunctionArgsScheme.merge(__lazy__invokeStripeCustomerCreateFnFunctionArgsScheme) as any;
