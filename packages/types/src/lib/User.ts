/* <ALLOW_AUTO_DELETE DEPENDENCIES="User" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { MessageTarget } from './MessageTarget';
import { NotificationDevice } from './NotificationDevice';
import { UserActivityLogEntry } from './UserActivityLogEntry';

/**
 * A user within an organization
 */
export interface User
{
    id:number;
    name?:string;
    email?:string;
    phone?:string;
    accountId:number;
    roles:string[];
    activity:UserActivityLogEntry[];
    notificationDevices?:NotificationDevice[];
    targetedMessages?:MessageTarget[];
}