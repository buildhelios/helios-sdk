import { UserRegistrationConditionTable } from "@buildhelios/sql-tables";
import { UserRegistrationCondition } from "@buildhelios/types";
import { asArray, queryClient, starStringToRegex } from "@iyio/common";

let conditionsPromise:Promise<UserRegistrationCondition[]>|null=null;

export const isUserSignUpAllowedAsync=async (signUpProps:UserSignProperties):Promise<UserSignAllowedStatus>=>{

    const conditions=await (conditionsPromise??(
        conditionsPromise=queryClient().selectQueryItemsAsync<UserRegistrationCondition>({
            table:UserRegistrationConditionTable.name,
        })
    ));

    return isUserSignUpAllowed(signUpProps,conditions);
}

export const clearIsUserSignUpAllowedAsyncCache=()=>{
    conditionsPromise=null;
}

export interface UserSignProperties
{
    email:string;
}

export type UserSignAllowedStatus='denied'|'allowed'|'explicity-allowed';

export const isUserSignUpAllowed=(
    {
        email
    }:UserSignProperties,
    condition:UserRegistrationCondition|UserRegistrationCondition[]
):UserSignAllowedStatus=>{

    const domain=email.split('@',2)[1]?.toLowerCase();
    if(!domain){
        return 'denied';
    }

    const ary=asArray(condition);

    if(ary.length===0){
        return 'allowed';
    }

    let status:UserSignAllowedStatus='denied';

    for(const c of ary){
        if(c.domain){
            if(c.domain.includes('*')){
                if(starStringToRegex(c.domain,'i').test(domain)){
                    status='explicity-allowed';
                }
            }else{
                if(c.domain===domain){
                    status='explicity-allowed';
                }
            }
        }
        if(c.email){
            if(c.email.includes('*')){
                if(starStringToRegex(c.email,'i').test(email)){
                    status='explicity-allowed';
                }
            }else{
                if(c.email===email){
                    status='explicity-allowed';
                }
            }
        }
    }

    return status;
}
