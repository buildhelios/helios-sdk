/* <ALLOW_AUTO_DELETE DEPENDENCIES="CreateFileRecordFn" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { CreateFileRecordRequestScheme } from './CreateFileRecordRequestScheme';

const __base__invokeCreateFileRecordFnFunctionArgsScheme=z.object({
});
const __lazy__invokeCreateFileRecordFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>CreateFileRecordRequestScheme),
});
export const invokeCreateFileRecordFnFunctionArgsScheme:(typeof __base__invokeCreateFileRecordFnFunctionArgsScheme)=__base__invokeCreateFileRecordFnFunctionArgsScheme.merge(__lazy__invokeCreateFileRecordFnFunctionArgsScheme) as any;
