/* <ALLOW_AUTO_DELETE DEPENDENCIES="FileSource" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';

const __base__FileSourceScheme=z.object({
    id:z.number().optional(),
    userId:z.number().int().optional(),
    accountId:z.number().int().optional(),
    created:z.number().optional(),
    lastModified:z.number().optional(),
    name:z.string().max(255),
    description:z.string().optional(),
    altId:z.string().max(255).optional(),
    smUrl:z.string().optional(),
    smContentType:z.string().max(255).optional(),
    smWidth:z.number().int().optional(),
    smHeight:z.number().int().optional(),
    smSizeBytes:z.number().int().optional(),
    smExternal:z.boolean().optional(),
    mdUrl:z.string().optional(),
    mdContentType:z.string().max(255).optional(),
    mdWidth:z.number().int().optional(),
    mdHeight:z.number().int().optional(),
    mdSizeBytes:z.number().int().optional(),
    mdExternal:z.boolean().optional(),
    lgUrl:z.string().optional(),
    lgContentType:z.string().max(255).optional(),
    lgWidth:z.number().int().optional(),
    lgHeight:z.number().int().optional(),
    lgSizeBytes:z.number().int().optional(),
    lgExternal:z.boolean().optional(),
    srcUrl:z.string(),
    srcContentType:z.string().max(255).optional(),
    srcWidth:z.number().int().optional(),
    srcHeight:z.number().int().optional(),
    srcSizeBytes:z.number().int().optional(),
    srcExternal:z.boolean().optional(),
    blurhash:z.string().optional(),
    source:z.string().max(255).optional().describe("Where the file was sourced from.\nFor example files sourced from Unsplash should use a source of \"unsplash\""),
    color:z.string().max(255).optional().describe("An approximation of the overall color of the file"),
});
const __lazy__FileSourceScheme=z.object({
});
export const FileSourceScheme:(typeof __base__FileSourceScheme)=__base__FileSourceScheme.merge(__lazy__FileSourceScheme) as any;
