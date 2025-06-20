/* <ALLOW_AUTO_DELETE DEPENDENCIES="ProfileResolveRequest" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import type { ProfileInfo } from './ProfileInfo';

export interface ProfileResolveRequest
{
    /**
     * profileId is ignored by public
     * endpoints
     */
    profileId?:number;
    deviceUuid?:string;
    profileUuid?:string;
    sessionUuid?:string;
    remoteAddress?:string;
    autoCreateProfile?:boolean;
    identificationSource?:string;
    profileInfo?:ProfileInfo;
}
