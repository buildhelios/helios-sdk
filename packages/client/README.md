# HELIOS Client

Efficiently collect and track user events while staying in full control of your data. Helios Hubble
is a first party data collection and analytics client that allows you to stay in compliance with all
of todays privacy laws while still gaining valuable insights into your users behaviour.

## Features
- Custom user event tracking
- Click streaming
- Console log tracking
- Error tracking
- Visual element tagging
- Full type safety

<br/>
<br/>

## Installation

Install using NPM
``` sh
npm i @buildhelios/client
```

-or- 

Install using vanilla JavaScript
``` html
<script>
(function(w,d,init){
    if(w.hubble){
        return;
    }
    w.hubble=function(){w.hubble._.push(arguments)};
    w.hubble._=[];
    w.hubble._init=init;
    var s=d.createElement('script');
    s.src='https://cdn.buildhelios.com/client.js';
    d.head.append(s);
})(window,document);
</script>

<!-- Minified -->
<script>
(function(w,d,i){if(!w.hubble){w.hubble=function(){w.hubble._.push(arguments)};w.hubble._=[];w.hubble._init=i;;var s=d.createElement('script');s.src='https://cdn.buildhelios.com/client.js';d.head.append(s);}})(window,document);
</script>

```

<br/>
<br/>

## Usage

``` typescript
import { initHeliosClient, addEventTarget, addListener, reportEvent } from "@buildhelios/client"

// initializes the HELIOS client. All configuration properties are optional.
initHeliosClient({

    // API endpoint to send reported events
    apiBaseUrl:'https://your-backend.io/api/',

    // Default targets
    targets:[
        {selector:'button,a[href]',eventType:'click'} // target all button and link clicks
    ],

    // The default events the client will listen to.
    listenTo:[
        'click',
        'mousedown',
        'mouseup',
    ],
})


// Begins listening to mouseover events. This will not directly cause mouseover events to be
// reported. A matching event target must also be added using the addEventTarget function.
addListener('mouseover');


// Event targets can be added after the client is initialized by calling the addEventTarget function.

// Adds a target that reports events when an element with the cta-button class is clicked.
addEventTarget({
    selector:'.cta-button',
    eventType:'click',
})

// Adds a target that reports all listened to events on the element with id user-switcher.
// Since eventTarget is not defined any event with a target element that matches the selector
// will cause the event to be reported.
addEventTarget({
    selector:'#user-switcher',
})

// Adds a target reports events when an element containing the text 'Big sales event' is clicked.
addEventTarget({
    contains:'Big sales event',
    eventType:'click',
})

// Multiple targets can be added at the same time by passing an array of targets
addEventTarget([
    {selector:'.cart',eventType:'mouseover'},
    {selector:'.checkout',eventType:'click'},
])

// Report a custom event. Calling reportEvent will queue the event to be send to the API, a matching
// target or listener is not required.
reportEvent({
    type:'some-custom-event-type',
    time:Date.now(),
    data:{
        weight:50,
        color:'green',
    }
})

```

<br/>
<br/>

## Configuration
You can pass an object implementing the HeliosClientConfig interface to the initHeliosClient 
function to customize the client's behaviour.

``` typescript
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
    transformEvent?:(event:WithoutId<EventRecord>)=>WithoutId<EventRecord>;

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

}
```

<br/>
<br/>

## Targets
Targets implement the UiEventTarget interface and are used to select events that are being
listened to.

``` typescript

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
```

<br/>
<br/>

## Event Records
Events are sent to the API as an array of EventRecords

``` typescript
export interface EventRecords
{
    /**
     * The events type
     */
    type:string;
    
    /**
     * A timestamp of when the event occurred
     */
    time:number;
    
    /**
     * Id of the user profile that triggered
     * the event
     */
    profileId?:number;
    
    /**
     * Id of a product associated with the event
     */
    productId?:number;
    
    /**
     * Alternate product id
     */
    productAltId?:string;
    
    /**
     * Id of a location associated with the event
     */
    locationId?:number;
    
    /**
     * Alternate location id
     */
    locationAltId?:string;
    
    /**
     * Id of the account associated with the event
     */
    accountId?:number;
    
    /**
     * Custom event data
     */
    data?:Record<string,any>,
    /**
     * A large unindexed string associated with the event
     */
    longText?:string;
    
    /**
     * A short indexed string associated with the event
     */
    text?:string;
    
    /**
     * Array of tags that can be used to group events
     */
    tags?:string[];
    
    /**
     * URL path where the event occurred
     */
    path?:string;
    
    /**
     * Host / domain where the event occurred
     */
    host?:string;
    
    /**
     * Name of element associated with
     * the event. Mostly used with elemView
     * events
     */
    elem?:string;
    
    /**
     * List of classes of the element target triggered the event
     */
    classList?:string[];
    
    /**
     * Browser page x
     */
    x?:number;
    
    /**
     * Browser page y
     */
    y?:number;
    
    /**
     * Browser scroll x
     */
    sx?:number;
    
    /**
     * Browser scroll y
     */
    sy?:number;
}
```
