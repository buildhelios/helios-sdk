import { Automation, AutomationTriggerRecord, CommsChannel, CustomFieldType } from "@buildhelios/types";
import { Query, ValueCondition } from "@iyio/common";
import { DayOfWeekBool } from "./common-types";

export interface AutomationAndTriggers{
    automation:Automation;
    triggers:AutomationTriggerRecord[];
}

export const autoNodeTypeAry=[
    'trigger',
    'delay',
    'create-list',
    'add-to-list',
    'remove-from-list',
    'send-message',
    'update-profile',
    'http-request',
    'webhook-entry',
    'condition',
    'custom',
    'target-profileId',
    'target-profileAltId',
    'target-email',
    'target-phone',
    'target-deviceId',
    'target-listId',
    'target-segmentId',
    'target-query',
    'target-array',
] as const;
export type AutoNodeType=typeof autoNodeTypeAry[number];

/**
 * User data that get assigned to ConvoNode.userData
 */
export interface AmNodeUserData
{
    type:AutoNodeType;
    condition?:ValueCondition;
    /**
     * Name of a variable to eval the condition with.
     * @default "user"
     */
    conditionVar?:string;
    sendMessageOptions?:AmSendMessageOptions;
    triggerOptions?:AmTrigger;
    delayOptions?:AmDelay;
    addToListOptions?:AmAddToListOptions;
    removeFromListOptions?:AmRemoveFromListOptions;
    updateProfileOptions?:AmUpdateProfileOptions;
    targetOptions?:AmTarget;
    lockSteps?:boolean;
}

/**
 * Data that gets assigned to AutomationTriggerRecord.data
 */
export interface AmTriggerRecordData
{
    userData?:AmNodeUserData;
    defaultVars?:Record<string,any>;
    payload?:any;
}

/**
 * Data that gets assigned to AutomationTraverser.data
 */
export interface AmTraverserData
{
    chain:AmTargetChain;
    /**
     * State stored in the workflow global variable
     */
    state:Record<string,any>;
}

export const allAmTargetBaseTypes=['profileId','altProfileId'] as const;
export type AmTargetBaseType=typeof allAmTargetBaseTypes[number];
export interface AmTargetBase
{
    type:AmTargetBaseType;
    profileId?:number;
    altProfileId?:string;
    useExpression?:boolean;
    /**
     * Raw convo used in-place the property that corresponds to the type prop
     */
    expression?:string;

    expressionDefault?:any;
}

export interface AmAddToListOptions
{
    listId?:number;
}

export interface AmRemoveFromListOptions
{
    listId?:number;
}

export interface AmPropUpdate
{
    name:string;
    value?:any;
    type:CustomFieldType;
    valueIsJson?:boolean;
    useExpression?:boolean;
    customField?:boolean;
    expression?:string;
    expressionDefault?:any;
}

export interface AmUpdateProfileOptions
{
    propUpdates:AmPropUpdate[];
}


export const allAmMessageTargetTypes=[...allAmTargetBaseTypes,'email','phone','deviceId'] as const;
export type AmMessageTargetType=typeof allAmMessageTargetTypes[number];
export interface AmMessageTarget extends Omit<AmTargetBase,'type'>
{
    type:AmMessageTargetType;
    email?:string;
    phone?:string;
    deviceId?:number;
}

export const allAmTargetTypes=[...allAmMessageTargetTypes,'array','listId','segmentId','query'] as const;
export type AmTargetType=typeof allAmTargetTypes[number];

export interface AmTarget extends Omit<AmMessageTarget,'type'>
{
    type:AmTargetType;
    array?:AmMessageTarget[];
    listId?:number;
    segmentId?:number;
    query?:Query;

    orderBy?:string;
    orderByDesc?:boolean;
    offset?:number;
    limit?:number;
}

export interface AmTargetChainItem
{
    /**
     * The target to add to the chain
     */
    target?:AmTarget;

    /**
     * If true all previous items in the chain should be cleared. If target is defined in this chain
     * item it will be the first item in the newly cleared chain.
     */
    clear?:boolean;
}

export interface AmTargetChain
{
    chain:AmTargetChainItem[];
}

export const allAmSendMessageTypes=['id','tag'] as const;
export type AmSendMessageType=typeof allAmSendMessageTypes[number];

export interface AmSendMessageOptions{

    //target:AmTarget;

    type:AmSendMessageType;
    /**
     * Id of the message to send.
     */
    messageId?:number;

    messageTag?:string;

    /**
     * If defined only the defined channels should be used.
     */
    channels?:CommsChannel[];

    data?:Record<string,any>;
}

export const allAmTriggerTypes=[
    'none',
    'event',
    'added-to-segment',
    'date-time',
    'manual',
] as const;

export type AmTriggerType=typeof allAmTriggerTypes[number];

export interface AmTrigger extends DayOfWeekBool
{
    type:AmTriggerType;
    eventType?:string;
    addToSegmentId?:number;

    timezone?:string;
    minute?:number;
    hour?:number;
    dayOfMonth?:number;
    /**
     * 1 - Jan
     * 2 - Feb
     */
    month?:number;

    year?:number;

    /**
     * Used with the following properties
     * - specificDayOfMonth
     */
    noRepeat?:boolean;

    // The following properties are exclusive an only 1 of them should be true at a time
    // These properties should be an enum

    specificDays?:boolean;
    specificDate:boolean;

}


export interface AmDelay extends DayOfWeekBool{

    days:number;
    hours:number;
    minutes:number;

    resumeAfter?:boolean;
    resumeHour?:number;
    resumeMinute?:number;
    resumeTimezone?:string;
    resumeTargetTimezone?:boolean;
    resumeSpecificDays?:boolean;
}
