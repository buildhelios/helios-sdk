import { FormRecord } from "@buildhelios/types";
import { queryParamsToObject } from "@iyio/common";
import { testStrMatch } from "./str-match-lib";

export interface ShowFormOptions
{
    url?:string;
    domain?:string;
    path?:string;
    query?:Record<string,string>;
    timeAtPathMs?:number;
    scrollY?:number;
    isMobile?:boolean;
    pageClosing?:boolean;
    pageOpening?:boolean;
    pathViewCount?:number;
    lastCloseTime?:number;
    hasProfile?:boolean;
    /**
     * Time used for date time based rules. Defaults to current time
     */
    now?:number;
}

export const shouldShowForm=(form:FormRecord,{
    url,
    domain,
    path,
    query,
    isMobile,
    timeAtPathMs,
    scrollY,
    pageClosing,
    pageOpening,
    pathViewCount,
    lastCloseTime,
    hasProfile,
    now=Date.now(),
}:ShowFormOptions):boolean=>{

    if(isMobile!==undefined && (isMobile?form.hideOnMobile:form.hideOnDesktop)){
        return false;
    }
    if( lastCloseTime!==undefined &&
        form.showAfterDismissedSeconds!==undefined &&
        lastCloseTime+form.showAfterDismissedSeconds*1000>now
    ){
        return false;
    }

    if(form.hideFromExistingProfiles && hasProfile){
        return false;
    }

    if(url){
        const match=/^\w+:\/\/([^/?#]+)\/?([^?#]*)([^#]*)/.exec(url);
        if(match){
            if(domain===undefined){
                domain=match[1];
            }
            if(path===undefined){
                path=match[2];
            }
            if(query===undefined){
                query=queryParamsToObject(match[3]??'')
            }
        }
    }

    if(path!==undefined && !path.startsWith('/')){
        path='/'+path;
    }

    // target - filter based on url
    if(form.includeDomains?.length && domain!==undefined){
        let matchFound=false;
        for(const d of form.includeDomains){
            if(testStrMatch(d,domain)){
                matchFound=true;
                break;
            }
        }
        if(!matchFound){
            return false;
        }
    }
    if(form.excludeDomains?.length && domain!==undefined){
        for(const d of form.excludeDomains){
            if(testStrMatch(d,domain)){
                return false;
            }
        }
    }


    if(form.includePaths?.length && path!==undefined){
        let matchFound=false;
        for(const d of form.includePaths){
            if(testStrMatch(d,path)){
                matchFound=true;
                break;
            }
        }
        if(!matchFound){
            return false;
        }
    }
    if(form.excludePaths?.length && path!==undefined){
        for(const d of form.excludePaths){
            if(testStrMatch(d,path)){
                return false;
            }
        }
    }


    if(form.includeQueryParams?.length && query!==undefined){
        let matchFound=false;
        for(const d of form.includeQueryParams){
            if(!d.key){
                continue;
            }
            const qv=query[d.key];
            if(qv===undefined){
                continue;
            }
            if(testStrMatch(d,qv)){
                matchFound=true;
                break;
            }
        }
        if(!matchFound){
            return false;
        }
    }
    if(form.excludeQueryParams?.length && query!==undefined){
        for(const d of form.excludeQueryParams){
            if(!d.key){
                continue;
            }
            const qv=query[d.key];
            if(qv===undefined){
                continue;
            }
            if(testStrMatch(d,qv)){
                return false;
            }
        }
    }

    // rules - only one needs to match
    if(form.showImmediately && (pageOpening===true || pageOpening===undefined)){
        return true;
    }

    if( scrollY!==undefined &&
        form.showAfterScrollPx!==undefined &&
        scrollY>form.showAfterScrollPx
    ){
        return true;
    }

    if( timeAtPathMs!==undefined &&
        form.showAfterSeconds!==undefined &&
        timeAtPathMs>(form.showAfterSeconds*1000)
    ){
        return true;
    }

    if( pathViewCount!==undefined &&
        form.showAfterPageViewCount!==undefined &&
        pathViewCount>=form.showAfterPageViewCount
    ){
        return true;
    }

    if( pageClosing && form.showOnPageClose){
        return true;
    }


    return false;

}
