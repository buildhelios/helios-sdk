import { addConsoleListener } from "@buildhelios/common";
import { CommonEventTypesMap } from "@buildhelios/types";
import { reportEvent } from "./client";
import { HeliosClientConfig } from "./client-types";

/**
 * Captures console log messages.
 */
export const captureConsole=(config:Required<HeliosClientConfig>)=>{

    const consoleLogPatterns=Array.isArray(config.consoleLogPattern)?
        config.consoleLogPattern:[config.consoleLogPattern];
    const patterns:RegExp[]=[];
    for(const p of consoleLogPatterns){
        if(typeof p === 'string'){
            try{
                patterns.push(new RegExp(p));
            }catch(ex){
                console.warn('Invalid console log patter',ex);
            }
        }else{
            patterns.push(p);
        }
    }

    addConsoleListener((entry)=>{
        if(config.consoleLogLevel&entry.level){
            let message='';
            for(const arg of entry.args){
                try{
                    message=(message?'\n':'')+(typeof arg === 'string'?arg:JSON.stringify(arg,null,4))
                }catch{
                    message=(message?'\n':'')+'!JSON.stringify failed - '+arg;
                }
            }

            for(const p of patterns){
                if(p.test(message)){
                    reportEvent({
                        type:CommonEventTypesMap.console,
                        time:Date.now(),
                        longText:message
                    })
                    break;
                }
            }
        }
    })
}
