export const aryRemoveItem=<T>(ary:T[],item:T):boolean=>
{
    if(!ary){
        return false;
    }
    for(let i=0;i<ary.length;i++){
        if(ary[i]===item){
            ary.splice(i,1);
            return true;
        }
    }
    return false;
}

export const aryRemoveAll=<T>(ary:T[],items:T[]):number=>
{
    if(!ary){
        return 0;
    }
    let removed=0;
    for(let r=0;r<items.length;r++){
        const item=items[r];
        for(let i=0;i<ary.length;i++){
            if(ary[i]===item){
                ary.splice(i,1);
                removed++;
                break;
            }
        }
    }
    return removed;
}

export const delayAsync=(delayMs:number):Promise<void>=>
{
    delayMs=Math.round(delayMs);
    return new Promise((r)=>{
        if(delayMs<=0){
            r();
        }else{
            (globalThis as any).setTimeout(r,delayMs);
        }
    });
}

export const escapeRegExp=(text:string):string=>{
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&');
}
