/* <ALLOW_AUTO_DELETE DEPENDENCIES="NewUserCreatedEvent" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { UserScheme } from './UserScheme';

const __base__NewUserCreatedEventScheme=z.object({
});
const __lazy__NewUserCreatedEventScheme=z.object({
    user:z.lazy(()=>UserScheme),
});
export const NewUserCreatedEventScheme:(typeof __base__NewUserCreatedEventScheme)=__base__NewUserCreatedEventScheme.merge(__lazy__NewUserCreatedEventScheme) as any;
