/* <ALLOW_AUTO_DELETE DEPENDENCIES="ExportStatus" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';

const __base__ExportStatusScheme=z.object({
    complete:z.boolean(),
    urls:z.string().max(255).array(),
});
const __lazy__ExportStatusScheme=z.object({
});
export const ExportStatusScheme:(typeof __base__ExportStatusScheme)=__base__ExportStatusScheme.merge(__lazy__ExportStatusScheme) as any;
