import { uuid } from "@iyio/common";

export interface HubblePos
{
    x:number;
    y:number;
}

export interface HubbleTarget
{
    id:string;
    name:string;
    selector:string;
    innerText?:string;
    matchPage?:string;
    triggerType?:string;
    tags?:string;
}

export const createHubbleTarget=(target:HTMLElement,merge?:HubbleTarget|null):HubbleTarget=>{

    const selector=(
        (target.id?'#'+target.id:target.tagName.toLowerCase())+
        (target.className.trim()?'.'+target.className.split(' ').join('.'):'')
    )

    return {
        ...(merge??{}),
        id:merge?.id??uuid(),
        name:merge?.name??'New target',
        selector,
        innerText:target.innerText.trim()?target.innerText.trim():undefined
    }

}

