import { defineStringParam, httpClient } from "@iyio/common";
import { format } from "date-fns";
import { ConvoResearchInfo, ConvoWebSearchAndResearchOptions } from "./convo-web-crawler-types";

export const enableResearchAgentParam=defineStringParam('enableResearchAgent');
export const researchAgentApiBaseUrlParam=defineStringParam('researchAgentApiBaseUrl');
export const researchAgentVncUrlParam=defineStringParam('researchAgentVncUrl');
export const researchAgentPasswordParam=defineStringParam('researchAgentPassword');

export interface ResearchItem
{
    id:string;
    name:string;
    time:number;
    date:string;
    info:ConvoResearchInfo;
}

export const getResearchAsync=async ():Promise<ResearchItem[]>=>{
    const password=researchAgentPasswordParam.get();

    const infos=await httpClient().getAsync<ConvoResearchInfo[]>(`${researchAgentApiBaseUrlParam()}/api/research`,{
        headers:password?{Authorization:`Bearer ${password}`}:undefined,
        noAuth:true
    })

    return infos?.map(i=>{

        const d=/^\d{4}-\d{2}-\d{2}/.exec(i.id);

        const date=d?new Date(d[0]):new Date();

        return {
            id:i.id,
            name:i.name,
            time:date.getTime(),
            date:format(date,'MMM d, yyyy'),
            info:i,
        }
    })??[];
}

export const getResearchDocAsync=async (id:string):Promise<string|null>=>{
    const password=researchAgentPasswordParam.get();

    const infos=await httpClient().getStringAsync(`${researchAgentApiBaseUrlParam()}/api/research/${id.split('/')[0]}/doc`,{
        headers:password?{Authorization:`Bearer ${password}`}:undefined,
        noAuth:true
    })



    return infos??null;
}

 export const startResearchAsync=async ({
    term,
    pageReq,
    title,
    subject1,
    subject2,
    subject3,
    subject4,
    conclusion,
}:{
    term:string;
    pageReq:string;
    title:string;
    subject1:string;
    subject2:string;
    subject3:string;
    subject4:string;
    conclusion:string;
}):Promise<any>=>{

    const url=`${researchAgentApiBaseUrlParam()}/api/research`;

    const request:ConvoWebSearchAndResearchOptions={
        search:{
            term:term,
            crawlOptions:{
                pageRequirementPrompt:pageReq||undefined,
                maxConcurrent:2
            },
            maxConcurrent:2
        },
        research:{
            title:title,
            subjects:[
                subject1.trim(),
                subject2.trim(),
                subject3.trim(),
                subject4.trim(),
            ].filter(s=>s),
            conclusion
        },
        // tmp - post back to self to prevent long running request and return id
        callbackUrl:`${researchAgentApiBaseUrlParam()}/`,
    }

    const r=await fetch(url,{
        method:'POST',
        // headers:{
        //     Authorization:`Bearer ${password}`
        // },
        body:JSON.stringify(request)
    });

    return await r.json();
}
