import { StrMatch } from "@buildhelios/types";
import { starStringTest } from "@iyio/common";

export const testStrMatch=(strMatch:StrMatch,value:string)=>{
    value=value.toLowerCase();
    const str=strMatch.value.toLowerCase();
    switch(strMatch.matchType){

        case 'equals': return str==value;

        case 'contains': return value.includes(str);

        case 'endsWith': return value.endsWith(str);

        case 'startsWith': return value.startsWith(str);

        case 'starMatch': return starStringTest(str,value);

        case 'regexMatch':
            try{
                const reg=new RegExp(str,'i');
                return reg.test(value);
            }catch(ex){
                console.error('Invalid StrMatch value',ex);
                return false;
            }

        default:
            return str===value;

    }
}
