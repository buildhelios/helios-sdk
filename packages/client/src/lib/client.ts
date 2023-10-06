import { WithoutId, aryRemoveAll, aryRemoveItem, delayAsync, enableConsoleListening, ignoreConsoleListeners } from '@buildhelios/common';
import { CommonEventTypesMap, EventRecord } from '@buildhelios/types';
import { captureConsole } from './captureConsole';
import { HeliosClientConfig, UiEventTarget, defaultHeliosClientConfig } from "./client-types";
import { getConfig, requireConfig, setConfig } from './config';
import { minifyEventRecords } from './minify';
import { sendAsync } from './sendAsync';
import { isTargetMatch } from './target';


/**
 * Initializes the HELIOS client
 */
export const initHeliosClient=(config?:HeliosClientConfig)=>{

    if(getConfig()){
        throw new Error('Hubble client already initialized');
    }

    const _config:Required<HeliosClientConfig>={
        ...defaultHeliosClientConfig,
        ...config,
    };

    setConfig(_config);

    if(globalThis.window){
        console.info('initHeliosClient',_config);
    }

    initListeners();

    listenToVisibilityChange();

    if(_config.watchPath){
        watchPathChanges();
    }

    if(_config.captureConsoleLogs){
        captureConsole(_config);
    }else if(_config.logEvents){
        enableConsoleListening();
    }

    addEventTarget(_config.targets);
}

/**
 * The default event listener. If the event matches any of the active targets the event will be
 * reported.
 */
export const heliosEventListener=(e:Event)=>{
    const config=getConfig();
    const win=globalThis.window;
    if(!config || !win || !isActiveTargetMatch(e.target,e.type)){
        return;
    }

    const evt:WithoutId<EventRecord>={
        type:e.type,
        time:Date.now(),
    }

    if(e instanceof MouseEvent){
        if(config.captureInputDevicePosition){
            evt.x=e.pageX;
            evt.y=e.pageY;
        }
    }else if(e instanceof TouchEvent){
        if(config.captureInputDevicePosition){
            const touch=e.changedTouches?.[0]??e.touches[0];
            if(touch){
                evt.x=touch.pageX;
                evt.y=touch.pageY;
            }
        }
    }else if(e instanceof KeyboardEvent){
        evt.text=keyEventToString(e);
    }

    if(config.captureScrollPosition){
        if(config.scrollElementSelector===null){
            evt.sy=win.scrollY;
            evt.sx=win.scrollX;
        }else{
            const scrollElem=win.document?.querySelector(config.scrollElementSelector);
            if(scrollElem){
                evt.sy=scrollElem.scrollTop;
                evt.sx=scrollElem.scrollLeft;
            }
        }
    }

    if(e.target instanceof Element){
        addElementPropsToEvent(e.target,evt);
    }

    reportEvent(evt);
}

const initListeners=()=>{
    const config=requireConfig();

    const list=[...config.listenTo];
    if(config.listenToKeyboardEvents){
        if(!list.includes('keydown')){list.push('keydown')}
        if(!list.includes('keyup')){list.push('keyup')}
        if(!list.includes('keypress')){list.push('keypress')}
    }

    if(config.listenToMoveEvents){
        if(!list.includes('mousemove')){list.push('mousemove')}
        if(!list.includes('touchmove')){list.push('touchmove')}
    }

    addListener(list);
}

const activeListeners:string[]=[];

/**
 * Adds an event or array of event types to listen to. For an event to be reported a matching target
 * must also be added.
 * By default event listeners are attached to
 * the window, however events can be prefixed with document:, body: or window: to specify which
 * object to attached to.
 */
export const addListener=(type:string|string[])=>{

    const list=Array.isArray(type)?type:[type];

    for(const eventType of list){
        if(activeListeners.includes(eventType)){
            continue;
        }
        activeListeners.push(eventType);
        const parts=eventType.split(':');
        const evtTarget=parts.length===1?'window':parts[0];
        (evtTarget==='body'?
            globalThis.window?.document?.body
        :evtTarget==='document'?
            globalThis.window?.document
        :
            globalThis.window
        )?.addEventListener(parts[1]??eventType,heliosEventListener,true);
    }
}

/**
 * Removes an event type or array of events from the active set of event being listened to.
 */
export const removeListener=(type:string|string[])=>{

    const list=Array.isArray(type)?type:[type];

    for(const eventType of list){
        const i=activeListeners.indexOf(eventType);
        if(i===-1){
            continue;
        }
        activeListeners.splice(i,1);
        const parts=eventType.split(':');
        const evtTarget=parts.length===1?'window':parts[0];
        (evtTarget==='body'?
            globalThis.window?.document?.body
        :evtTarget==='document'?
            globalThis.window?.document
        :
            globalThis.window
        )?.removeEventListener(parts[1]??eventType,heliosEventListener,true);
    }

}

const watchPathChanges=()=>{
    const config=requireConfig();
    let lastLocation='';
    const checkLocation=()=>{
        const loc=parsePath(globalThis.window?.location?.toString(),config);
        if(lastLocation!==loc){
            lastLocation=loc;
            reportEvent({
                type:CommonEventTypesMap.pageView,
                time:Date.now(),

            })
        }
    }
    checkLocation();
    setInterval(checkLocation,10);
}

/**
 * listens to visibility changes and flushes the send queue when the page is ready to close
 */
const listenToVisibilityChange=()=>{
    globalThis.window?.document?.addEventListener('visibilitychange',()=>{
        const hidden=document.visibilityState==='hidden';
        reportEvent({
            type:hidden?CommonEventTypesMap.pageHidden:CommonEventTypesMap.pageVisible,
            time:Date.now(),
        })
        if(hidden){
            flushSendQueueAsync();
        }
    });

}


/**
 * Converts a KeyboardEvent into a string that represents the keys being pressed.
 */
export const keyEventToString=(event:KeyboardEvent):string=>{
    if(event.key.length<2 && (event.ctrlKey || event.altKey || event.metaKey)){
        return `${event.key}:${event.ctrlKey?'c':''}${event.altKey?'a':''}${event.metaKey?'m':''}${event.shiftKey?'s':''}`;
    }else{
        return event.key;
    }
}

const activeTargets:UiEventTarget[]=[];

/**
 * Adds an event target or array of event targets. Event targets are used to determine which events
 * will be tracked and sent to the API.
 */
export const addEventTarget=(target:UiEventTarget|UiEventTarget[]):void=>{

    if(Array.isArray(target)){
        activeTargets.push(...target);
    }else{
        activeTargets.push(target);
    }
}

/**
 * Removes an event target or array of event targets.
 */
export const removeEventTarget=(target:UiEventTarget|UiEventTarget[]):void=>{
    if(Array.isArray(target)){
        aryRemoveAll(activeTargets,target);
    }else{
        aryRemoveItem(activeTargets,target);
    }
}

/**
 * Checks if the elem and event type match any of the active event targets.
 */
export const isActiveTargetMatch=(elem:Element|EventTarget|null|undefined,eventType:string):boolean=>{
    if(!(elem instanceof Element)){
        return false;
    }
    for(const target of activeTargets){
        if(isTargetMatch(target,elem,eventType,getCurrentPath(),true)){
            return true;
        }
    }
    return false;
}

const addElementPropsToEvent=(elem:Element,event:WithoutId<EventRecord>)=>{
    event.elem=elem.tagName?.toLowerCase();
    if(elem.classList.length){
        event.classList=[];
        for(let i=0;i<elem.classList.length;i++){
            const c=elem.classList.item(i);
            if(c){
                event.classList.push(c);
            }
        }
    }
}


export interface TrackEventOverloads
{
    (event:WithoutId<EventRecord>|WithoutId<EventRecord>[]):void;
    (eventType:string,tag?:string|string[]|null,elem?:Element|null):void;
}

/**
 * Reports an event to the API. Active event targets are no taken into consideration.
 */
export const reportEvent:TrackEventOverloads=(
    eventOrEventType:WithoutId<EventRecord>|WithoutId<EventRecord>[]|string,
    tag?:string|string[]|null,
    elem?:Element|null
)=>{
    if(typeof eventOrEventType === 'string'){
        eventOrEventType={
            type:eventOrEventType,
            time:Date.now(),
        }
        if(tag){
            eventOrEventType.tags=Array.isArray(tag)?tag:[tag];
        }
        if(elem){
            addElementPropsToEvent(elem,eventOrEventType);
        }
    }
    const queueEvt=(event:WithoutId<EventRecord>)=>{
        const config=requireConfig();
        if(config?.populateHost && !event.host && config.host){
            event.host=config.host;
        }
        if(config.populatePath && !event.path){
            event.path=getCurrentPath();
        }
        sendQueue.push(config.transformEvent(event));
        if(config.logEvents){
            console.log(config.logPrefix,event,ignoreConsoleListeners);
        }
    }
    if(Array.isArray(eventOrEventType)){
        for(const e of eventOrEventType){
            queueEvt(e);
        }
    }else{
        queueEvt(eventOrEventType);
    }
    sendQueuedEvents();
}

let sendQueue:WithoutId<EventRecord>[]=[];
let isSending=false;
const sendQueuedEvents=()=>{
    if(isSending || !sendQueue.length){
        return;
    }
    isSending=true;
    (async ()=>{
        try{
            await delayAsync(requireConfig().sendDelayMs);
            while(sendQueue.length){
                await flushSendQueueAsync();
            }

        }finally{
            isSending=false;
        }
    })();
}

/**
 * Manually flushes the send queue. In most cases you should not have to manually flush the send
 * queue, it is automatically flushed periodically and at the end of the session.
 */
export const flushSendQueueAsync=async ()=>{
    const queue=sendQueue;
    if(queue.length===0){
        return;
    }
    sendQueue=[];

    if(getConfig()?.minifyEvents){
        minifyEventRecords(queue);
    }

    await sendAsync(requireConfig(),'/events','POST',queue,true);
}


const parsePath=(path:string|null|undefined,config:HeliosClientConfig):string=>{
    if(!path){
        return '/';
    }
    const match=(config.includeHashInPath?
        /^[a-z]+:\/\/[^/]+(\/.*)/:
        /^[a-z]+:\/\/[^/]+(\/[^#]*)/
    ).exec(path);

    return match?.[1]??'/';
}
export const getCurrentPath=():string=>{
    if(!globalThis.window){
        return '/';
    }
    return parsePath(globalThis.window?.location?.toString(),getConfig()??defaultHeliosClientConfig);
}
