import { WithoutId, aryRemoveAll, aryRemoveItem, delayAsync, enableConsoleListening, eventProxyUrlParam, ignoreConsoleListeners } from '@buildhelios/common';
import { CommonEventTypesMap, EventRecord, EventUrlProxyRequest, LocationInfo, ProfileLookup, ProfileResolveRequest, ProfileStatus, UtmParams } from '@buildhelios/types';
import { PromiseSource, objectToQueryParams, queryParamsToObject, shortUuid } from '@iyio/common';
import { captureConsole } from './captureConsole';
import { ClientSignInToken, HeliosClientConfig, HeliosEvtFn, OptionalEventRecord, UiEventTarget, defaultHeliosClientConfig } from "./client-types";
import { registerCustomComponents } from './comp-reg';
import { getConfig, requireConfig, setConfig } from './config';
import { FormMgr } from './forms/FormMgr';
import { minifyEventRecords } from './minify';
import { sendAsync } from './sendAsync';
import { isTargetMatch } from './target';

let utmParams:UtmParams|undefined=undefined;
const utmParamsKey='utmParams';
const profileLookupKey='profileLookupInfo';

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

    loadUtmParams();

    getHeliosClientLocationInfoAsync();

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

    registerCustomComponents();

    setupGlobalHeliosFn();

    new FormMgr().initAsync();
}

const setupGlobalHeliosFn=()=>{
    if(!globalThis.window){
        return;
    }
    let heliosFn:HeliosEvtFn|undefined=(globalThis.window as any)?.heliosEvt;
    (globalThis.window as any).heliosEvt=reportEvent;

    if(typeof heliosFn === 'function' && Array.isArray(heliosFn._)){
        try{
            for(const args of heliosFn._){
                (reportEvent as any)(...(args as any[]));
            }
        }catch(ex){
            console.log('Invalid args passed to heliosEvt global function',ex);
        }
    }
}

/**
 * First checks the current URL params for any UTM params then checks in session storage for any
 * previously stored UTM params
 */
export const loadUtmParams=()=>{

    const url=globalThis.window?.location?.href;
    if(url){
        const matches=[...url.matchAll(/\butm[_-]?(campaign|source|medium|content|term)=(.*?)(?=&|$)/g)];
        if(matches.length){
            const campaign=matches.find(m=>m[1]==='campaign')?.[1];
            const source=matches.find(m=>m[1]==='source')?.[1];
            const medium=matches.find(m=>m[1]==='medium')?.[1];
            const content=matches.find(m=>m[1]==='content')?.[1];
            const term=matches.find(m=>m[1]==='term')?.[1];
            const _utmParams:UtmParams={
                utmCampaign:campaign?decodeURIComponent(campaign):undefined,
                utmSource:source?decodeURIComponent(source):undefined,
                utmMedium:medium?decodeURIComponent(medium):undefined,
                utmContent:content?decodeURIComponent(content):undefined,
                utmTerm:term?decodeURIComponent(term):undefined,
            }
            setUtmParams(_utmParams);
            return;
        }
    }


    const _utmParams=getStoreValue<UtmParams>(utmParamsKey,true);
    if(_utmParams){
        utmParams=_utmParams;
    }

}

export const setUtmParams=(params:UtmParams|undefined):UtmParams|undefined=>{
    if(params){
        setStoreValue(utmParamsKey,params,true);
        utmParams={...params};
    }else{
        deleteStoreValue(utmParamsKey,true);
        utmParams=undefined;
    }
    return params;
}

export const getUtmParams=():UtmParams|undefined=>{
    return utmParams?{...utmParams}:undefined;
}

/**
 * Used to generate unique Ids client side
 */
export const generateUid=()=>{
    const baseId=shortUuid();
    const suffix=shortUuid();
    const max=suffix.length-1;
    return (
        baseId+
        suffix[Math.floor(Math.random()*max)]+
        suffix[Math.floor(Math.random()*max)]+
        suffix[Math.floor(Math.random()*max)]
    )
}

export const getHeliosClientSessionId=():string=>{
    return getOrSetStoreString('sessionId',generateUid,true);
}

export const getHeliosClientDeviceId=():string=>{
    return getOrSetStoreString('deviceId',generateUid,false);
}

const storeCache:Record<string,string>={}
const getStoreString=(key:string,session=false):string|undefined=>{
    key=requireConfig().storagePrefix+key;
    let value:string|undefined=storeCache[(session?'s':'l')+key];
    if(value!==undefined){
        return value;
    }
    value=(session?globalThis.sessionStorage?.getItem(key):globalThis.localStorage?.getItem(key))??undefined;
    if(value!==undefined){
        storeCache[(session?'s':'l')+key]=value;
    }
    return value;
}

const getOrSetStoreString=(key:string,defaultValue:string|(()=>string),session=false):string=>{
    const value=getStoreString(key,session);
    if(value===undefined){
        return setStoreString(key,typeof defaultValue === 'function'?defaultValue():defaultValue,session);
    }else{
        return value;
    }
}

const setStoreString=(key:string,value:string,session=false):string=>{
    key=requireConfig().storagePrefix+key;
    storeCache[(session?'s':'l')+key]=value;
    if(session){
        globalThis.sessionStorage?.setItem(key,value);
    }else{
        globalThis.localStorage?.setItem(key,value);
    }
    return value;
}
const getStoreValue=<T>(key:string,session=false):T|undefined=>{
    const json=getStoreString(key,session);
    if(json===undefined){
        return undefined;
    }
    return JSON.parse(json);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOrSetStoreValue=<T>(key:string,defaultValue:(()=>T)|T,session=false):T=>{
    const json=getStoreString(key,session);
    if(json===undefined){
        const value=typeof defaultValue === 'function'?(defaultValue as (()=>T))():defaultValue;
        setStoreString(key,JSON.stringify(value),session);
        return value;
    }
    return JSON.parse(json);
}

const setStoreValue=<T>(key:string,value:T,session=false):T=>{
    setStoreString(key,JSON.stringify(value),session);
    return value;
}

const deleteStoreValue=(key:string,session=false)=>{
    key=requireConfig().storagePrefix+key;
    (session?globalThis.sessionStorage:globalThis.localStorage)?.removeItem(key);
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

const addElementPropsToEvent=(elem:Element,event:OptionalEventRecord)=>{
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


interface EventPromisePair
{
    evt:OptionalEventRecord;
    promiseSource:PromiseSource<OptionalEventRecord>;
}

export interface TrackEventOverloads
{
    (event:OptionalEventRecord|OptionalEventRecord[],reportedPromise?:PromiseSource<OptionalEventRecord>):void;
    (eventType:string,tag?:string|string[]|null,elem?:Element|null):void;
}


const eventPromisePairs:EventPromisePair[]=[];

/**
 * Reports an event to the API. Active event targets are no taken into consideration.
 */
export const reportEvent:TrackEventOverloads=(
    eventOrEventType:OptionalEventRecord|OptionalEventRecord[]|string,
    tag?:string|string[]|null|PromiseSource<OptionalEventRecord>,
    elem?:Element|null
)=>{
    let promiseSource:PromiseSource<OptionalEventRecord>|undefined;
    if(typeof tag==='object' && !Array.isArray(tag)){
        if(tag){
            promiseSource=tag;
        }
        tag=null;
    }
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
    const queueEvt=(event:OptionalEventRecord)=>{
        const config=requireConfig();
        if(config?.populateHost && !event.host && config.host){
            event.host=config.host;
        }
        if(config.populatePath && !event.path){
            event.path=getCurrentPath();
        }
        if(utmParams){
            for(const e in utmParams){
                if((utmParams as any)[e] && !((event as any)[e])){
                    (event as any)[e]=(utmParams as any)[e];
                }
            }
        }
        if(!event.cdi){
            event.cdi=getHeliosClientDeviceId();
        }
        if(!event.sid){
            event.sid=getHeliosClientSessionId();
        }
        if(event.time===undefined){
            event.time=Date.now();
        }
        const transformed=config.transformEvent(event);
        if(promiseSource){
            eventPromisePairs.push({
                evt:event,
                promiseSource,
            })
        }
        sendQueue.push(transformed);
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
    sendQueuedEvents(promiseSource?true:false);
}

/**
 * Alias of reportEvent that can be used for compatibility with vanilla javascript.
 */
export const heliosEvt=reportEvent;


export const getHeliosClientLocationInfoAsync=async ():Promise<LocationInfo|undefined>=>{
    return (await lookupHeliosClientAsync())?.location;
}

let _lookup:ProfileLookup|undefined=undefined;
let lookupPromise:Promise<ProfileLookup|undefined>|undefined=undefined;
export const lookupHeliosClientAsync=async ():Promise<ProfileLookup|undefined>=>{
    const info=getStoreValue<ProfileLookup>(profileLookupKey,true);
    if(info){
        return info;
    }
    return await (lookupPromise??(lookupPromise=_lookupProfile()))
}

const _lookupProfile=async ():Promise<ProfileLookup|undefined>=>{
    const request:ProfileResolveRequest={
        deviceUuid:getHeliosClientDeviceId(),
        autoCreateProfile:true,
    }
    try{
        const query=queryParamsToObject(globalThis?.location?.search);
        if(query[eventProxyUrlParam]){
            const evtData:EventUrlProxyRequest=JSON.parse(query[eventProxyUrlParam]);
            if(evtData?.profileUuid){
                request.profileUuid=evtData.profileUuid;
            }
        }
    }catch{}
    const info=await sendAsync<ProfileLookup>(requireConfig(),'/profile/resolve?'+objectToQueryParams(request),'GET');
    _lookup=(info??{})
    setStoreValue(profileLookupKey,true);
    return _lookup;
}

let sendQueue:OptionalEventRecord[]=[];
let isSending=false;
const sendQueuedEvents=(noDelay?:boolean)=>{
    if(isSending || !sendQueue.length){
        return;
    }
    isSending=true;
    (async ()=>{
        try{
            await delayAsync(noDelay?1:requireConfig().sendDelayMs);
            if(!_lookup){
                await lookupHeliosClientAsync();
            }
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

    if(_lookup?.profile?.pStat===ProfileStatus.disabled){// profile is disabled
        return;
    }

    if(_lookup){
        const loc=_lookup.location;
        const pro=_lookup.profile;
        for(const evt of queue){
            if(loc){
                for(const e in loc){
                    if((loc as any)[e] && !(evt as any)[e]){
                        (evt as any)[e]=(loc as any)[e];
                    }
                }
            }
            if(pro && evt.profileId===undefined){
                evt.profileId=pro.id;
            }

        }
    }


    if(getConfig()?.minifyEvents){
        minifyEventRecords(queue);
    }

    try{
        await sendAsync(requireConfig(),'/events','POST',queue,true);
    }finally{
        for(const e of queue){
            for(let i=0;i<eventPromisePairs.length;i++){
                const p=eventPromisePairs[i];
                if(!p){
                    continue;
                }
                eventPromisePairs.splice(i,1);
                i--;
                if(p.evt===e){
                    p.promiseSource.resolve(e);
                }
            }
        }
    }
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

const signInTokenKey='helios-client-sign-in-token';
let signInToken:ClientSignInToken|null|undefined=undefined;
const getToken=()=>{
    if(signInToken && isExpired(signInToken)){
        signInToken=undefined;
    }
    if(signInToken!==undefined){
        return signInToken;
    }
    const t=globalThis.localStorage?.getItem(signInTokenKey);
    if(t){
        const parsed:ClientSignInToken=JSON.parse(t);
        if(isExpired(parsed)){
            signInToken=null;
            globalThis.localStorage?.removeItem(signInTokenKey);
        }else{
            signInToken=parsed;
        }
    }else{
        signInToken=null;
    }
    return signInToken;
}

export const tryAutoSignInHeliosClient=():boolean=>{
    if(signInToken){
        return true;
    }
    return getToken()?true:false;
}

export const isHeliosClientSignedIn=()=>{
    return getToken()?true:false;
}

export const signInHeliosClient=async (username:string,password:string):Promise<string>=>{
    const token=await sendAsync<string>(requireConfig(),'/sign-in','POST',{
        username,
        password,
    });
    if(!token){
        throw new Error('Sign-in failed');
    }
    signInToken={
        token,
        expires:Date.now()+1000*60*120
    }
    globalThis.localStorage?.setItem(signInTokenKey,JSON.stringify(signInToken))
    return token;
}

const isExpired=(token:ClientSignInToken|null|undefined)=>{
    if(!token){
        return true;
    }
    return token.expires<Date.now();
}

export const heliosHttpGetAsync=<TResult=any>(
    endpoint:string,
):Promise<TResult|undefined>=>{
    return sendAsync(requireConfig(),endpoint,'GET',undefined,false,getToken()?.token);
}

export const heliosHttpPostAsync=<TResult=any,TBody=any>(
    endpoint:string,
    body:TBody
):Promise<TResult|undefined>=>{
    return sendAsync(requireConfig(),endpoint,'POST',body,false,getToken()?.token);
}

export const heliosHttpDeleteAsync=<TResult=any>(
    endpoint:string
):Promise<TResult|undefined>=>{
    return sendAsync(requireConfig(),endpoint,'DELETE',undefined,false,getToken()?.token);
}

export const setFormOpenTime=(uuid:string,time=Date.now())=>{
    const key=requireConfig().storagePrefix+'form-open-'+uuid;
    globalThis.localStorage?.setItem(key,time.toString());
}

export const getFormOpenTime=(uuid:string):number|undefined=>{
    const key=requireConfig().storagePrefix+'form-open-'+uuid;
    const time=globalThis.localStorage?.getItem(key);
    return time?Number(time):undefined;
}


export const setFormCloseTime=(uuid:string,time=Date.now())=>{
    const key=requireConfig().storagePrefix+'form-close-'+uuid;
    globalThis.localStorage?.setItem(key,time.toString());
}

export const getFormCloseTime=(uuid:string):number|undefined=>{
    const key=requireConfig().storagePrefix+'form-close-'+uuid;
    const time=globalThis.localStorage?.getItem(key);
    return time?Number(time):undefined;
}
