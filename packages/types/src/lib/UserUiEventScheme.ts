/* <ALLOW_AUTO_DELETE DEPENDENCIES="UserUiEvent" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { UiEventScheme } from './UiEventScheme';
import { ProfileScheme } from './ProfileScheme';

const __base__UserUiEventScheme=z.object({
});
const __lazy__UserUiEventScheme=z.object({
    profile:z.lazy(()=>ProfileScheme),
    uiEvent:z.lazy(()=>UiEventScheme),
});
export const UserUiEventScheme:(typeof __base__UserUiEventScheme)=__base__UserUiEventScheme.merge(__lazy__UserUiEventScheme) as any;