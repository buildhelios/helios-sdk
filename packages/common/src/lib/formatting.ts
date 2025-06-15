import { format } from 'date-fns';

export interface FormatNumberOptions
{
    notFormatted?:boolean;
}

export const formatNumber=(number:number, options?:FormatNumberOptions):string=>{
    if(!isFinite(number) || !number){
        number=0;
    }
    if (number<1000){
        return number.toLocaleString();
    }else if(number<10000 && options?.notFormatted){
        return number.toLocaleString();
    }else if(number < 100000) {
         return `${Math.round(number/100)/10}${options?.notFormatted ?"":"k"}`
    }else if(number < 1000000) {
        return `${Math.round(number/1000)}${options?.notFormatted ?"":"k"}`
    }else if(number < 1000000000) {
        return `${Math.round(number/100000)/10}${options?.notFormatted ?"":"m"}`
    }else{
        return `${Math.round(number/100000000)/10}${options?.notFormatted?"":"b"}`
    }
}

export const formatDate=(date:number|Date):string=>{
    return format(date,'PP')
}

export const formatDateTime=(date:number|Date):string=>{
    return format(date,'PP p')
}

export const formatTime=(date:number|Date):string=>{
    return format(date,'p')
}

const sizeUnits=['B','KB','MB','GB','TB'];
export const formatFileSize=(size:number|null|undefined):string=>{
    if(!size || !isFinite(size)){
        size=0;
    }
    let step=1000;
    for(let i=0;i<sizeUnits.length;i++){
        if(size<step){
            return (Math.round(size/step*10000)/10).toLocaleString()+' '+(sizeUnits[i]??'');
        }
        step*=1000;
    }
    step/=1000;
    return (Math.round(size/step*10000)/10).toLocaleString()+' '+(sizeUnits[sizeUnits.length-1]??'');
}

export const formatPropName=(propName:string|null|undefined):string=>{
    if(!propName){
        return '';
    }
    propName=propName.trim().replace(/([a-z])([A-Z]+)/g,(_,l,u)=>l+' '+u);
    return propName.substring(0,1).toUpperCase()+propName.substring(1);
}

export const formatMs =(ms:number)=> {
    if(ms >=1000) {
        const seconds = ms/1000

        if(seconds >=60) {
            const minutes = Math.round((seconds/60))
            return `${minutes}min`
        }
        return `${Math.round(seconds)}s` 
    }
    return `${Math.round(ms)}ms`
}
