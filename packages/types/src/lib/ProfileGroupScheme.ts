/* <ALLOW_AUTO_DELETE DEPENDENCIES="ProfileGroup" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import { z } from 'zod';
import { ProfileScheme } from './ProfileScheme';
import { ProfileGroupPlacementScheme } from './ProfileGroupPlacementScheme';
import { QueryScheme } from './QueryScheme';
import { ProfileGroupTypeScheme } from './ProfileGroupTypeScheme';

const __base__ProfileGroupScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).optional(),
    accountId:z.number().int().optional(),
    created:z.number().optional(),
    description:z.string().optional(),
    lastUserCount:z.number().int().optional(),
}).describe("Represents an audience or list of profiles.\nProfile groups consists of profiles included by the the groups query and by profiles that are directly placed in the group via ProfileGroupPlacement records.");
const __lazy__ProfileGroupScheme=z.object({
    type:z.lazy(()=>ProfileGroupTypeScheme),
    query:z.lazy(()=>QueryScheme).optional(),
    placedProfiles:z.lazy(()=>ProfileGroupPlacementScheme).array().optional(),
    identProfiles:z.lazy(()=>ProfileScheme).array().optional(),
});
export const ProfileGroupScheme:(typeof __base__ProfileGroupScheme)=__base__ProfileGroupScheme.merge(__lazy__ProfileGroupScheme) as any;
