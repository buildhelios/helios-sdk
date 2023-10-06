/* <ALLOW_AUTO_DELETE DEPENDENCIES="AccountDomain" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { z } from 'zod';

const __base__AccountDomainScheme=z.object({
    id:z.string().max(255),
    verified:z.boolean().optional(),
    verificationCode:z.string().max(255).optional().describe("Used with TXT records to verify domain ownership"),
    dataCollectionEnabled:z.boolean().optional().describe("Verification is not required for data collection to be enabled."),
});
const __lazy__AccountDomainScheme=z.object({
});
export const AccountDomainScheme:(typeof __base__AccountDomainScheme)=__base__AccountDomainScheme.merge(__lazy__AccountDomainScheme) as any;