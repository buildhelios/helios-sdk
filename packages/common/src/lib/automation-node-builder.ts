import { ConvoEdge, ConvoNode, valueConditionToConvo } from "@convo-lang/convo-lang";
import { valueConditionHasValue, wAryPush, wSetProp, wSetPropOrDeleteFalsy } from "@iyio/common";
import { AmNodeUserData } from "./automation-types";

const tab='    ';

export interface UpdateAutomationNodeOptions
{
    node?:ConvoNode;
    edge?:ConvoEdge;
}

export const updateAutomationNode=({
    node,
    edge,
}:UpdateAutomationNodeOptions)=>{

    const entity=node??edge;

    const data=entity?.userData as AmNodeUserData|undefined;

    if(!data){
        return;
    }

    if(node && !data.lockSteps){
        wSetProp(node,'steps',[]);
    }

    const cond=data.condition?valueConditionHasValue(data.condition)?data.condition:undefined:undefined;

    const wrapCondition=(convo:string,fallback?:string,indent='    '):string=>{
        if(cond){
            return (
`if(${
    valueConditionToConvo(cond,{
        defaultPath:data.conditionVar??'user',
        skipInitIndent:true,
        indent,
        tab:'    ',
        allowEval:true,
    })
}) then (
${indent}    ${convo}
${indent}    return(true)
${indent}) else (
${indent}    return(false)
${indent})`
            )
        }else{
            return convo||fallback||'';
        }
    }

    const wrapInvoke=(convo:string)=>{
        return (
`> invoke()->(
    ${convo}
)`
        )
    }


    if(data.type && !data.lockSteps){
        switch(data.type){

            case 'send-message':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('sendMsg(userData.sendMessageOptions)'))
                });
                break;

            case 'trigger':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('','return(true)'))
                });
                break;

            case 'delay':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('setDelay(userData.delayOptions)'))
                });
                break;

            case 'add-to-list':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('addProfileToList(userData.addToListOptions)'))
                });
                break;

            case 'remove-from-list':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('removeProfileFromList(userData.removeFromListOptions)'))
                });
                break;

            case 'update-profile':
                wAryPush(node?.steps,{
                    convo:wrapInvoke(wrapCondition('updateProfile(userData.updateProfileOptions)'))
                });
                break;

            case 'condition':
                wSetPropOrDeleteFalsy(edge,'conditionConvo',wrapCondition('',undefined,''));
                break;

            default:
                if(data.type.startsWith('target-')){
                    wAryPush(node?.steps,{
                        convo:wrapInvoke(wrapCondition('pushTarget(userData.targetOptions)'))
                    });
                }
                break;


        }
    }

}
