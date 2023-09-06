import { escapeRegExp } from "@buildhelios/common";
import { UiEventTarget } from "./client-types";

const pathCacheKey=Symbol('pathCacheKey');
/**
 * Checks if the given target's path matches the given path.
 */
export const isTargetPathMatch=(target:UiEventTarget,path:string):boolean=>{
    if(target.path===undefined && target.pathRegex===undefined){
        return true;
    }
    let reg:RegExp|undefined|null=(target as any)[pathCacheKey];
    if(reg===undefined){
        if(typeof target.pathRegex === 'string'){
            try{
                reg=new RegExp(target.pathRegex);
            }catch{
                reg=null;
            }
        }else if(target.pathRegex){
            reg=target.pathRegex;
        }else if(target.path){
            reg=new RegExp(`^${escapeRegExp(target.path).replace(/\*/g,'.*?')}$`)
        }
        (target as any)[pathCacheKey]=reg;
    }

    if(!reg){
        return false;
    }

    return reg.test(path);
}

/**
 * Checks if an element matches a UIEventTarget.
  * @param target The target to match
  * @param elem The element to match
  * @param eventType The even type to match
  * @param path If null path is not checked
  * @param checkAncestors If true the ancestors of the element are checked as well.
  * @returns
  */
export const isTargetMatch=(target:UiEventTarget,elem:Element,eventType:string,path:string|null,checkAncestors:boolean):boolean=>{

    if(!elem || !target || eventType===undefined){
        return false;
    }

    let match=false;
    if(eventType===null){
        match=true;
    }else if(Array.isArray(target.eventType)){
        match=target.eventType.includes(eventType);
    }else if(target.eventType){
         match=target.eventType===eventType;
    }else{
        match=target.eventType===undefined;
    }

    if(match && path!==null && !isTargetPathMatch(target,path)){
        match=false;
    }

    if(!match){
        return false;
    }

    return _isTargetMatch(target,elem,eventType,checkAncestors);
}
const _isTargetMatch=(
    target:UiEventTarget,
    elem:Element,
    eventType:string,
    checkAncestors:boolean
):boolean=>{

    let match=true;

    if(match && target.selector){
        match=false;
        if(Array.isArray(target.selector)){
            for(const s of target.selector){
                if(elem.matches(s)){
                    match=true;
                    break;
                }
            }
        }else{
            if(elem.matches(target.selector)){
                match=true;
            }
        }
    }

    if(match && target.contains!==undefined){
        match=false;
        const textContent=elem.textContent?.trim()??'';
        if(Array.isArray(target.contains)){
            for(const c of target.contains){
                if(textContent.includes(c)){
                    match=true;
                    break;
                }
            }
        }else{
            match=textContent.includes(target.contains);
        }
    }

    if(match && target.match!==undefined){
        match=false;
        const textContent=elem.textContent?.trim()??'';
        if(Array.isArray(target.contains)){
            for(const c of target.contains){
                if(textContent===c){
                    match=true;
                    break;
                }
            }
        }else{
            match=textContent===target.match;
        }
    }

    if(match && target.isMatch){
        match=target.isMatch(target,elem,eventType);
    }

    if(!match && checkAncestors && elem.parentElement){
        return _isTargetMatch(target,elem.parentElement,eventType,true);
    }

    return match;
}
