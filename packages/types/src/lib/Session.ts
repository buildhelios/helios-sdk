/* <ALLOW_AUTO_DELETE DEPENDENCIES="Session" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { EventRecord } from './EventRecord';

/**
 * Represents a group of events group
 * by time
 */
export interface Session
{
    startTime:number;
    endTime:number;
    events?:EventRecord[];
}