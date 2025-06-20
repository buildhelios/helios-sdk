/* <ALLOW_AUTO_DELETE DEPENDENCIES="Session" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { EventRecordScheme } from './EventRecordScheme';

const __base__SessionScheme=z.object({
    startTime:z.number(),
    endTime:z.number(),
}).describe("Represents a group of events group by time");
const __lazy__SessionScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
});
export const SessionScheme:(typeof __base__SessionScheme)=__base__SessionScheme.merge(__lazy__SessionScheme) as any;
