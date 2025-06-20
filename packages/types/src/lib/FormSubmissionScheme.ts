/* <ALLOW_AUTO_DELETE DEPENDENCIES="FormSubmission" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { EventRecordScheme } from './EventRecordScheme';
import { FormDataItemScheme } from './FormDataItemScheme';

const __base__FormSubmissionScheme=z.object({
    id:z.number().int(),
    uuid:z.string().max(255),
    formId:z.number().int().optional(),
    profileId:z.number().int().optional(),
    profileUuid:z.string().max(255).optional(),
    userId:z.number().int().optional(),
    locationId:z.number().int().optional(),
    created:z.number(),
    submissionUrl:z.string().optional().describe("The URL where the submission was submitted from"),
    metadata:z.any().optional(),
    step:z.number(),
});
const __lazy__FormSubmissionScheme=z.object({
    data:z.lazy(()=>FormDataItemScheme).array(),
    events:z.lazy(()=>EventRecordScheme).array().optional(),
});
export const FormSubmissionScheme:(typeof __base__FormSubmissionScheme)=__base__FormSubmissionScheme.merge(__lazy__FormSubmissionScheme) as any;
