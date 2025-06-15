import { CommsChannel } from "@buildhelios/types";
import { IconType } from "./icon-types";

export interface CommsChannelDescription
{
    type:CommsChannel;
    name:string;
    icon:IconType;
}

export const commsChannelDescriptions:CommsChannelDescription[]=[
    {
        type:'email',
        name:'Email',
        icon:'envelope',
    },
    {
        type:'sms',
        name:'SMS',
        icon:'message-sms',
    },
    {
        type:'notification',
        name:'Notification',
        icon:'message-lines',
    },
]
