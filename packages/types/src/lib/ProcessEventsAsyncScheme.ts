/* <ALLOW_AUTO_DELETE DEPENDENCIES="ProcessEventsAsync" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';
import { EventSubmissionScheme } from './EventSubmissionScheme';

const __base__ProcessEventsAsyncFunctionArgsScheme=z.object({
    callMap:z.any(),
});
const __lazy__ProcessEventsAsyncFunctionArgsScheme=z.object({
    submission:z.lazy(()=>EventSubmissionScheme),
});
export const ProcessEventsAsyncFunctionArgsScheme:(typeof __base__ProcessEventsAsyncFunctionArgsScheme)=__base__ProcessEventsAsyncFunctionArgsScheme.merge(__lazy__ProcessEventsAsyncFunctionArgsScheme) as any;