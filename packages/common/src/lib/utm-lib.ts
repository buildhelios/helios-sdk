import { getUriProtocol, queryParamsToObject } from "@iyio/common";
import { UtmObject } from "./common-types";

export const formatUtmLink=(link:string,utmObj:UtmObject):string=>{

    if(!getUriProtocol(link)){
        link=`https://${link}`;
    }

    const q=link.indexOf('?');
    const params=q===-1?{}:queryParamsToObject(link);
    if(utmObj.utmSource && !params['utm_source']){
        params['utm_source']=utmObj.utmSource;
    }
    if(utmObj.utmMedium && !params['utm_medium']){
        params['utm_medium']=utmObj.utmMedium;
    }
    if(utmObj.utmCampaign && !params['utm_campaign']){
        params['utm_campaign']=utmObj.utmCampaign;
    }
    if(utmObj.utmContent && !params['utm_content']){
        params['utm_content']=utmObj.utmContent;
    }

    if(q!==-1){
        link=link.substring(0,q);
    }
    if(Object.keys(params).length){
        let first=true;
        for(const k in params){
            link+=`${first?'?':'&'}${encodeURIComponent(k)}=${encodeURIComponent(params[k]??'')}`
            first=false;
        }
    }
    return link;
}
