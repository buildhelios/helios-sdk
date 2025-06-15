import { ProfileActiveTable, ProfileDisabledTable, ProfileSuppressedTable, ProfileTable } from "@buildhelios/sql-tables";
import { Profile, ProfileStatus, User } from "@buildhelios/types";
import { DataTableDescription, Query, buildQuery } from "@iyio/common";


export type ProfileLabelType='fullName'|'firstName'|'fullNameEmail';

export const getProfileLabel=(profile:Profile|User|null|undefined,type:ProfileLabelType,defaultValue='(unknown)'):string=>{
    if(!profile){
        return defaultValue;
    }

    switch(type){

        case 'firstName':
            if(profile.firstName){
                return profile.firstName;
            }
            break;

        case 'fullName':
            if(profile.firstName && profile.lastName){
                return `${profile.firstName} ${profile.lastName}`;
            }
            if(profile.name){
                return profile.name;
            }
            break;

        case 'fullNameEmail':
            if(profile.email){
                if(profile.firstName && profile.lastName){
                return `${profile.firstName} ${profile.lastName} - ${profile.email}`;
                }
                if(profile.name){
                    return `${profile.name} - ${profile.email}`;
                }
                return profile.email;
            }
            break;

    }

    if(profile.name){
        return profile.name;
    }

    if(profile.firstName){
        if(profile.lastName){
            return `${profile.firstName} ${profile.lastName}`;
        }
        return profile.firstName
    }

    if(profile.email){
        return profile.email;
    }

    if(profile.lastName){
        return profile.lastName;
    }

    if(profile.phone){
        return profile.phone;
    }

    return `id:${profile.id}`;


}

export const convertToActiveProfileQuery=<T extends Query|null|undefined>(query:T):T=>{
    return convertToPStatProfileQuery(ProfileStatus.active,query);
}

export const convertToDisabledProfileQuery=<T extends Query|null|undefined>(query:T):T=>{
    return convertToPStatProfileQuery(ProfileStatus.disabled,query);
}

export const convertToSuppressedProfileQuery=<T extends Query|null|undefined>(query:T):T=>{
    return convertToPStatProfileQuery(ProfileStatus.suppressed,query);
}

export const convertToPStatProfileQuery=<T extends Query|null|undefined>(pStat:ProfileStatus,query:T):T=>{
    if(!query){
        return query;
    }
    const table=getProfileTableForStatus(pStat);
    if(query.table===table.name){
        return query;
    }
    if(query.table!==ProfileTable.name && query.table!==ProfileActiveTable.name && query.table!==ProfileDisabledTable.name && query.table!==ProfileSuppressedTable.name ){
        throw new Error('Only queries targeting the Profile, Profile_active, Profile_disabled or Profile_suppressed table or view should be passed to convertToPStatProfileQuery. query='+buildQuery(query));
    }
    return {
        ...query,
        table:table.name,
    }
}

export const getProfileTableForStatus=(pStat:ProfileStatus):DataTableDescription<Profile>=>(
    pStat===ProfileStatus.active?
        ProfileActiveTable
    :pStat===ProfileStatus.suppressed?
        ProfileSuppressedTable
    :
        ProfileDisabledTable
)
