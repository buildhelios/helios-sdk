/* <ALLOW_AUTO_DELETE DEPENDENCIES="UiEvent" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { UiTarget } from './UiTarget';
import { UiEventType } from './UiEventType';

export interface UiEvent
{
    time:number;
    tags?:string[];
    type:UiEventType;
    target:UiTarget;
}
