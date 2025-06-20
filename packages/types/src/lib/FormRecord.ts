/* <ALLOW_AUTO_DELETE DEPENDENCIES="FormRecord" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen
import type { Profile } from './Profile';
import type { EventRecord } from './EventRecord';
import type { StrMatch } from './StrMatch';
import type { LayoutAxis } from './LayoutAxis';
import type { LayoutTransition } from './LayoutTransition';
import type { LayoutAlignment } from './LayoutAlignment';
import type { FormDisplayType } from './FormDisplayType';
import type { FormSubmission } from './FormSubmission';
import type { MessageTemplate } from './MessageTemplate';

export interface FormRecord
{
    /**
     * If not storing in the database use an id of 0
     */
    id:number;
    uuid:string;
    name?:string;
    description?:string;
    created?:number;
    accountId?:number;
    iconUrl?:string;
    published?:boolean;
    tags?:string[];
    privacyPolicyUrl?:string;
    termsUrl?:string;
    lastUpdated?:number;
    isDraft?:boolean;
    /**
     * Id of a form record that this form
     * record is a draft of
     */
    publishId?:number;
    /**
     * Id of a form record that this form
     * record is a published version of
     */
    draftId?:number;
    width?:string;
    height?:string;
    transitionDurationMs?:number;
    showImmediately?:boolean;
    /**
     * Rule based on time
     */
    showAfterSeconds?:number;
    /**
     * Rule based on scroll distance
     */
    showAfterScrollPx?:number;
    /**
     * Rule based on page view count
     */
    showAfterPageViewCount?:number;
    showAfterSubmitted?:boolean;
    submissionEmail?:string;
    /**
     * Controls how long to wait to show the form
     * again after showing it
     */
    showAfterDismissedSeconds?:number;
    showOnPageClose?:boolean;
    hideOnMobile?:boolean;
    hideOnDesktop?:boolean;
    disableClickOutsideCloseDesktop?:boolean;
    disableClickOutsideCloseMobile?:boolean;
    hideFromExistingProfiles?:boolean;
    /**
     * A CSS selector that will be used to select an
     * element to insert the form into. If not
     * insertTarget or the insertTarget is not found
     * the form will be inserted into the body
     */
    insertTarget?:string;
    templates:MessageTemplate[];
    formSubmissions?:FormSubmission[];
    /**
     * Defaults to fullScreen
     */
    displayType?:FormDisplayType;
    hAlign?:LayoutAlignment;
    vAlign?:LayoutAlignment;
    transition?:LayoutTransition;
    transitionAxis?:LayoutAxis;
    includePaths?:StrMatch[];
    excludePaths?:StrMatch[];
    includeDomains?:StrMatch[];
    excludeDomains?:StrMatch[];
    includeQueryParams?:StrMatch[];
    excludeQueryParams?:StrMatch[];
    events?:EventRecord[];
    identProfiles?:Profile[];
}
