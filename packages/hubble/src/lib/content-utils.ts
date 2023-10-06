

export const updateNodes=<T extends HTMLElement=HTMLElement>(
    parent:HTMLElement|Document,
    query:string,callback:(elem:T,i:number)=>void|boolean,
    skipUpdateCheck=false
):T[]=>{
    const updated:T[]=[];
    const list=parent.querySelectorAll(query);
    for(let i=0;i<list.length;i++){
        const elem:any=list.item(i)
        if(!skipUpdateCheck && !markUpdated(elem)){
            continue;
        }
        updated.push(elem);
        const r=callback(elem,i);
        if(r===false){
            unmarkUpdated(elem);
        }
    }
    return updated;
}

export const getNodeForUpdate=<T extends HTMLElement=HTMLElement>(parent:HTMLElement|Document,query:string,skipUpdateCheck=false):T|null=>{
    const elem=parent.querySelector(query);
    if(!skipUpdateCheck && !markUpdated(elem)){
        return null;
    }
    return elem as any;
}


export const nodeListToAry=<T extends Element>(nodeList:NodeListOf<T> | HTMLCollectionOf<T>):T[]=>{
    const ary:T[]=[];
    for(let i=0;i<nodeList.length;i++){
        ary.push(nodeList.item(i) as any)
    }
    return ary;
}

export const parseQueryString=(url:string):Record<string,any>=>{
    const qi=url.indexOf('?');
    if(qi!==-1){
        url=url.substring(qi+1);
    }
    const parts=url.split('&');
    const obj:Record<string,string>={};
    for(const p of parts){
        const [k,v]=p.split('=');
        let value=decodeURIComponent(v??'');
        if(value.startsWith('{')){
            try{
                value=JSON.parse(value);
            }catch{/* */}
        }
        obj[decodeURIComponent(k??'')]=value;
    }
    return obj;
}

export const appendQuery=(url:string,query:Record<string,string|number>)=>{
    for(const e in query){
        url+=(url.includes('?')?'&':'?')+encodeURIComponent(e)+'='+encodeURIComponent(query[e]?.toString()??'true')
    }
    return url
}

export const appendQueryObject=(url:string,name:string,obj:Record<string,any>)=>{
    url+=(url.includes('?')?'&':'?')+encodeURIComponent(name)+'='+
        encodeURIComponent(JSON.stringify(obj))
    return url
}

const UPDATED=Symbol();

export const markUpdated=(obj:any)=>{
    if(!obj || obj[UPDATED]){
        return false;
    }
    obj[UPDATED]=true;
    return true;
}
export const unmarkUpdated=(obj:any)=>{
    if(!obj || obj[UPDATED]){
        return false;
    }
    delete obj[UPDATED];
    return true;
}
