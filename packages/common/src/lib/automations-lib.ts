import { Automation, AutomationTraverser, EventRecordSubmission } from "@buildhelios/types";
import { ConvoExecutionContext, ConvoTraverser } from "@convo-lang/convo-lang";
import { aryShallowUnorderedCompare, dayMs, deepCompare, hourMs, minuteMs } from "@iyio/common";
import { addDays, addHours, addMinutes, format } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';
import { AmDelay, AmTarget, AmTargetType, AmTrigger } from "./automation-types";

export const scheduleAutomationTriggerVersion=1;
export const automationTraverserVersion=1;
export const traverserRunTimeLimitMs=minuteMs*5;
export const traverserMaxRunCount=300;

export const automationTraverserGraphVarName='workflow.automationTraverser';
export const automationTraverserStateName='automationTraverser';
export const automationDelayStateName='automationDelay';
export const automationRunStartTimeStateName='runStartTime';
export const automationRunTraverseCountStateName='runTraverseCount';
export const automationEventStateName='event';

export const getAmDelayMs=(delay:Partial<AmDelay>|null|undefined):number=>{
    if(!delay){
        return 0;
    }
    return (
        (delay.days??0)*dayMs+
        (delay.hours??0)*hourMs+
        (delay.minutes??0)*minuteMs
    )

}

export const getAmTriggerCronExpression=(trigger:AmTrigger):string|undefined=>{
    if(trigger.hour===undefined && trigger.minute===undefined){
        return undefined;
    }

    const exactDate=trigger.specificDate && trigger.year!==undefined && trigger.month!==undefined && trigger.dayOfMonth!==undefined;

    const weeDays=(trigger.specificDays?
        (trigger.sunday?',SUN':'')+
        (trigger.monday?',MON':'')+
        (trigger.tuesday?',TUE':'')+
        (trigger.wednesday?',WED':'')+
        (trigger.thursday?',THU':'')+
        (trigger.friday?',FRI':'')+
        (trigger.saturday?',SAT':'')
    :'');

    return `${
        trigger.minute??0
    } ${
        trigger.hour??0
    } ${
        (exactDate && trigger.dayOfMonth!==undefined)?trigger.dayOfMonth:'?'
    } ${
        (exactDate && trigger.month!==undefined)?trigger.month:'*'
    } ${
        weeDays?weeDays.substring(1):exactDate?'?':'*'
    } ${
        (exactDate && trigger.year!==undefined)?trigger.year:'*'
    }`

}
export const getAmDelayExpression=(delay:AmDelay,timezone:string):string|undefined=>{
    if(delay.resumeAfter){

        const weeDays=(delay.resumeSpecificDays?
            (delay.sunday?',SUN':'')+
            (delay.monday?',MON':'')+
            (delay.tuesday?',TUE':'')+
            (delay.wednesday?',WED':'')+
            (delay.thursday?',THU':'')+
            (delay.friday?',FRI':'')+
            (delay.saturday?',SAT':'')
        :'');

        return `cron(${
            delay.resumeMinute??0
        } ${
            delay.resumeHour??0
        } ? * ${
            weeDays?weeDays.substring(1):'*'
        } *)`
    }else{
        const date=getAmDelayOffsetDate(delay,timezone);
        return `at(${format(date,"yyyy-MM-dd'T'HH:mm:ss")})`
    }

}

export const getAmDelayOffsetDate=(delay:AmDelay,timezone:string,start=utcToZonedTime(Date.now(),timezone)):Date=>{
    if(delay.days){new Date().toLocaleString()
        start=addDays(start,delay.days);
    }
    if(delay.hours){
        start=addHours(start,delay.hours);
    }
    if(delay.minutes){
        start=addMinutes(start,delay.minutes);
    }
    return start;
}

export const compareAutomations=(a:Automation|null|undefined,b:Automation|null|undefined):boolean=>{
    if(!a || !b){
        return !a && !b;
    }
    return (
        deepCompare(a.graph,b.graph) &&
        (a.description??'')===(b.description??'') &&
        a.name===b.name &&
        aryShallowUnorderedCompare(a.tags??[],b.tags??[])
    )
}

export const automationTraverserTvKey=Symbol();

export const getAutomationTraverserTv=(at:AutomationTraverser):ConvoTraverser|undefined=>{
    return (at?.traverser as any)??(at as any)?.[automationTraverserTvKey]
}

export const automationTraverserToConvoTraverser=(at:AutomationTraverser):ConvoTraverser=>{
    const tv={...at.traverser} as ConvoTraverser;
    const atCopy:Partial<AutomationTraverser>={...at};
    delete atCopy.traverser;
    (atCopy as any)[automationTraverserTvKey]=tv;
    tv.state={
        ...tv.state,
        automationTraverser:atCopy
    }
    return tv;
}

export const convoTraverserToAutomationTraverser=(tv:ConvoTraverser):AutomationTraverser|undefined=>{
    const atValue=tv.state[automationTraverserStateName];
    if(!atValue){
        return undefined;
    }
    const at:AutomationTraverser={...atValue};
    tv={...tv};
    tv.state={...tv.state}
    delete tv.state[automationTraverserStateName];
    at.traverser=tv;
    if(!isAutomationTraverser(at)){
        const msg='Invalid automation traverser found';
        console.error(msg,at)
        throw new Error(msg);
    }
    return at;
}

export const isAutomationTraverser=(value:any):value is AutomationTraverser=>{
    const at=value as AutomationTraverser;
    return (
        at &&
        (typeof at.id === 'number') &&
        (at.traverserId===undefined || (typeof at.traverserId === 'string')) &&
        (typeof at.tid === 'string') &&
        (typeof at.automationId === 'number') &&
        at.chain && (typeof at.chain === 'object') &&
        (
            (at.traverser && (typeof at.traverser === 'object')) ||
            (value?.[automationTraverserTvKey] && (typeof value?.[automationTraverserTvKey] === 'object'))
        ) &&
        (typeof at.created === 'number') &&
        (typeof at.version === 'number') &&
        (typeof at.exeState === 'string') &&
        (typeof at.runCount === 'number') &&
        (typeof at.running === 'boolean') &&
        (at.errorMessage===undefined || (typeof at.errorMessage === 'string')) &&
        (at.lastUpdate===undefined || (typeof at.lastUpdate === 'number')) &&
        (at.currentNodeId===undefined || (typeof at.currentNodeId === 'string')) &&
        (at.startingNodeId===undefined || (typeof at.startingNodeId === 'string')) &&
        (typeof at.currentStepIndex === 'number')
    )?true:false;
}

export const eventSubmissionToAmTarget=(evt:EventRecordSubmission):AmTarget|undefined=>{
    const type:AmTargetType|undefined=(
        (evt.profileId!==undefined)?'profileId':
        (evt.profileAltId!==undefined)?'altProfileId':
        undefined
    );
    if(!type){
        return undefined;
    }
    return {
        type,
        profileId:evt.profileId,
        altProfileId:evt.productAltId,
    }
}


export const getAutomationTraverserFromExecContext=(ctx:ConvoExecutionContext):AutomationTraverser|undefined=>{
    const at=ctx.getVar('workflow')?.[automationTraverserStateName];
    return isAutomationTraverser(at)?at:undefined;
}
