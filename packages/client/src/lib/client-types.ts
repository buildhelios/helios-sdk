import { LogLevel } from "@buildhelios/common";
import { EventRecord, FormRecord } from "@buildhelios/types";
import { defaultCustomComponentPrefix } from "./client-const";

export interface UiEventTarget
{
    /**
     * Any valid CSS selector
     */
    selector?:string|string[];

    /**
     * If defined the target will only target the defined event type or types.
     */
    eventType?:string|string[];

    /**
     * If defined the target must contain the specified text
     */
    contains?:string|string[];

    /**
     * If defined the target must text content must exactly match the specified text
     */
    match?:string|string[];

    /**
     * Can be used for dynamic target matching
     */
    isMatch?:(target:UiEventTarget,elem:Element,eventType:string)=>boolean;

    /**
     * If defined the target will only be used when the current browser path matches. The (*)
     * character can be used as a wildcard.
     */
    path?:string;

    /**
     * If defined the target will only be used when the current browser path matches.
     */
    pathRegex?:RegExp|string;

}

export interface HeliosClientConfig
{
    /**
     * Base URL of a HELIOS compatible API.
     * @default "/api/"
     */
    apiBaseUrl?:string;

    /**
     * Max number of retires to attempt when sending API requests.
     * @default 5
     */
    maxApiRetires?:number;

    /**
     * Number of milliseconds between API request retires. After each retire the delay is doubled.
     * @default 1000
     */
    apiRetireBaseDelayMs?:number;

    /**
     * Number of milliseconds to wait before sending events to the API. This delay allows to events
     * to be grouped together and sent as a single request.
     * @default 10,0000
     */
    sendDelayMs?:number;

    /**
     * Number of milliseconds to wait between checking for path changes. Path checking is used
     * to track page views when website use the history API. An interval is used for maximum browser
     * compatibility since the popstate event behaves differently between most main stream browsers
     * and the history.pushState function does not trigger the popstate event in many browsers.
     * @default 10
     */
    pathCheckIntervalMs?:number;


    /**
     * If true the browsers path will be watched and changes will reported as pageView events
     * @default true
     */
    watchPath?:boolean;

    /**
     * If true URL hashes are included in location information. Enabling this option can be uses
     * for older SPA that don't use the history API
     * @default false
     */
    includeHashInPath?:boolean;

    /**
     * If true the path property of events will be auto populated
     * @default true
     */
    populatePath?:boolean;

    /**
     * If true the host property of events will be auto populated
     * @default true
     */
    populateHost?:boolean;

    /**
     * The host used to auto populate the host property of events.
     * @default globalThis.window?.location?.host??'localhost'
     */
    host?:string;

    /**
     * If true console logs will be captured
     */
    captureConsoleLogs?:boolean;

    /**
     * A regular expression or array of regular expressions used to filter out console log messages.
     */
    consoleLogPattern?:(string|RegExp)|(string|RegExp)[];

    /**
     * Defines which type of console log messages are tracked. For example if you only want to
     * track console.error and console.warn calls you can set consoleLogType to
     * LogLevel.warn|LogLevel.error.
     * @default LogLevel.log|LogLevel.warn|LogLevel.error
     */
    consoleLogLevel?:LogLevel;

    /**
     * Used to control the whitespace of non string console log messages. consoleLogJsonFormat
     * will be passed as the third argument to JSON.arg:JSON.stringify.
     * @default 4
     */
    consoleLogJsonFormat?:string|number;

    /**
     * Can be used to modify events before they are sent to the API.
     */
    transformEvent?:(event:OptionalEventRecord)=>OptionalEventRecord;

    /**
     * If true mouse, touch and scroll position will be captured.
     * @default true
     */
    captureInputDevicePosition?:boolean;

    /**
     * If true input device events will also capture scroll position information
     * @default false
     */
    captureScrollPosition?:boolean;

    /**
     * A CSS selector that selects the element used to scroll the page. If null window.scroll[X|Y].
     * will be used. Use scrollElementSelector if the main content of the page is scrolled using an
     * element other than the body element.
     * @default null
     */
    scrollElementSelector?:string|null;

    /**
     * If true events are minified before being sent to the API. Minifying is disabled by default
     * but is recommended for production environments.
     * @default false
     */
    minifyEvents?:boolean;

    /**
     * Default list of targets to capture events for
     */
    targets?:UiEventTarget[];

    /**
     * List of events to listen to. By default event listeners are attached to
     * the window, however events can be prefixed with document:, body: or window: to specify which
     * object to attached to
     * @default [
     *   'click',
     *   'mousedown',
     *   'mouseup',
     *   'mouseover',
     *   'mouseout',
     *   'touchstart',
     *   'touchend',
     * ]
     */
    listenTo?:string[];


    /**
     * Adds mousemove and touchmove events to events listened to. Capturing move events can generate
     * a very large amounts of events and is not recommended to be used in production environments
     * @default false
     */
    listenToMoveEvents?:boolean;

    /**
     * Adds keypress, keydown, keyup to the list of events listened to. Capturing keyboard events
     * can potentially lead to capturing sensitive data such as passwords.
     * @default false
     */
    listenToKeyboardEvents?:boolean;

    /**
     * If true events will be written to the console using console.log. Logged events will not be
     * re-captured if captureConsoleLogs is enabled, so you do not have to worry about causing a
     * recursive loop enabling both logEvents and captureConsoleLogs.
     * @default false
     */
    logEvents?:boolean;

    /**
     * A prefix that is added to events logged to the console. Used in combination with logEvents.
     * @default 'reportEvent'
     */
    logPrefix?:string;

    /**
     * A prefix given to all values stored in local and session storage
     * @default "heliosClient/"
     */
    storagePrefix?:string;

    /**
     * A prefix given to custom component
     * @default "helios-"
     */
    customComponentPrefix?:string;

    /**
     * Array of forms to display based on rules and conditions
     */
    forms?:FormRecord[];

    /**
     * Path to the sdk service worker.
     * @default "/scripts/helios-service-worker.js"
     */
    serviceWorkerPath?:string;

    /**
     * If true forms should not be displayed based on rules.
     */
    disableFormRules?:boolean;

    /**
     * If true the window should be closed after a form is submitted
     */
    closeWindowOnFormSubmit?:boolean;

    /**
     * If true forms will not be submitted to the submission endpoint and will be logged to the console.
     * This is helpful for debugging.
     */
    disableFormSubmit?:boolean;

}

export interface ClientSignInToken
{
    token:string;
    expires:number;
}

export const allLogTypes=['debug','info','log','warn','error'];
Object.freeze(allLogTypes);
export type LogType=typeof allLogTypes[number];

export interface HeliosEvtFn
{
    /**
     * Adds events
     */
    (...args:any[]):void;

    /**
     * Temporary store for events
     */
    _:any[];

    /**
     * workspace URL
     */
    _u:string;

    /**
     * Optional init function
     */
    _i?:()=>void;

    _config?:HeliosClientConfig;
}

/**
 * An event record without an id and all properties other than type optional.
 */
export type OptionalEventRecord=Omit<EventRecord,'id'|'time'> & {time?:number};

export const defaultHeliosClientConfig:Required<HeliosClientConfig>={
    apiBaseUrl:'/api/',
    host:globalThis.window?.location?.host??'localhost',
    maxApiRetires:5,
    apiRetireBaseDelayMs:100,
    pathCheckIntervalMs:10,
    watchPath:true,
    includeHashInPath:false,
    captureConsoleLogs:false,
    consoleLogPattern:/./,
    consoleLogLevel:LogLevel.log|LogLevel.warn|LogLevel.error,
    consoleLogJsonFormat:4,
    transformEvent:e=>e,
    captureInputDevicePosition:true,
    scrollElementSelector:null,
    minifyEvents:false,
    targets:[],
    listenToMoveEvents:false,
    listenToKeyboardEvents:false,
    logEvents:false,
    logPrefix:'reportEvent',
    sendDelayMs:10000,
    populateHost:true,
    populatePath:true,
    listenTo:[
        'click',
        'mousedown',
        'mouseup',
        'mouseover',
        'mouseout',
        'touchstart',
        'touchend',
    ],
    captureScrollPosition:false,
    storagePrefix:'heliosClient/',
    customComponentPrefix:defaultCustomComponentPrefix,
    forms:[],
    serviceWorkerPath:'/scripts/helios-service-worker.js',
    disableFormRules:false,
    closeWindowOnFormSubmit:false,
    disableFormSubmit:false,
}
Object.freeze(defaultHeliosClientConfig.listenTo);
Object.freeze(defaultHeliosClientConfig);
