// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
// generator = zodPlugin
import { z } from 'zod';

const __base__ProfileScheme=z.object({
    id:z.number().int(),
    accountId:z.number().int().optional(),
    name:z.string().max(255).optional(),
    firstName:z.string().max(255).optional(),
    middleName:z.string().max(255).optional(),
    lastName:z.string().max(255).optional(),
    email:z.string().email().optional(),
    website:z.string().max(255).optional(),
    created:z.number().optional(),
    lastActivity:z.number().optional(),
    timezone:z.string().max(255).optional(),
    phone:z.string().max(255).optional(),
    country:z.string().max(255).optional(),
    state:z.string().max(255).optional(),
    city:z.string().max(255).optional(),
    address:z.string().max(255).optional(),
    address2:z.string().max(255).optional(),
    postalCode:z.string().max(255).optional(),
    birthDate:z.number().optional(),
    identificationSource:z.string().max(255).optional(),
    data:z.record(z.any()).optional(),
    /**
     * Usually the store the profile is associated with
     */
    primaryLocationId:z.number().int().optional(),
});
const __lazy__ProfileScheme=z.object({
    workers:z.lazy(()=>WorkerScheme).array().optional(),
    events:z.lazy(()=>EventRecordScheme).array().optional(),
    status:z.lazy(()=>SubscriptionStatusScheme),
    notificationDevices:z.lazy(()=>NotificationDeviceScheme).array().optional(),
    targetedMessages:z.lazy(()=>MessageTargetScheme).array().optional(),
    groupPlacements:z.lazy(()=>ProfileGroupPlacementScheme).array().optional(),
});
export const ProfileScheme:(typeof __base__ProfileScheme)=__base__ProfileScheme.merge(__lazy__ProfileScheme) as any;
export type Profile=z.infer<typeof __base__ProfileScheme> & {
    workers?:Worker[];
    events?:EventRecord[];
    status:SubscriptionStatus;
    notificationDevices?:NotificationDevice[];
    targetedMessages?:MessageTarget[];
    groupPlacements?:ProfileGroupPlacement[];
};

const __base__invokeCreateWorkerFnFunctionArgsScheme=z.object({
});
const __lazy__invokeCreateWorkerFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>CreateWorkerRequestScheme),
});
export const invokeCreateWorkerFnFunctionArgsScheme:(typeof __base__invokeCreateWorkerFnFunctionArgsScheme)=__base__invokeCreateWorkerFnFunctionArgsScheme.merge(__lazy__invokeCreateWorkerFnFunctionArgsScheme) as any;
export type invokeCreateWorkerFnFunctionArgs=z.infer<typeof __base__invokeCreateWorkerFnFunctionArgsScheme> & {
    input:CreateWorkerRequest;
};

const __base__WorkerScheme=z.object({
    /**
     * A combination of the workers userId
     * and nodeAddress.
     * format = {userId}.{nodeAddress}
     */
    id:z.number().int(),
    uv:z.number().int(),
    created:z.number(),
    data:z.record(z.string()).optional(),
});
const __lazy__WorkerScheme=z.object({
});
export const WorkerScheme:(typeof __base__WorkerScheme)=__base__WorkerScheme.merge(__lazy__WorkerScheme) as any;
/**
 * todo - change format of id. right now
 * the structure of the id only allows
 * for a users to a a single worker at
 * a node address
 */
export type Worker=z.infer<typeof __base__WorkerScheme>;

const __base__invokeSendDiscountFnFunctionArgsScheme=z.object({
});
const __lazy__invokeSendDiscountFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>DiscountMessageRequestScheme),
});
export const invokeSendDiscountFnFunctionArgsScheme:(typeof __base__invokeSendDiscountFnFunctionArgsScheme)=__base__invokeSendDiscountFnFunctionArgsScheme.merge(__lazy__invokeSendDiscountFnFunctionArgsScheme) as any;
/**
 * Sends a discount message to the target user
 */
export type invokeSendDiscountFnFunctionArgs=z.infer<typeof __base__invokeSendDiscountFnFunctionArgsScheme> & {
    input:DiscountMessageRequest;
};

const __base__DiscountMessageRequestScheme=z.object({
    id:z.string().max(255),
    template:z.string().max(255),
    discountPercent:z.number().optional(),
    discount:z.number().optional(),
});
const __lazy__DiscountMessageRequestScheme=z.object({
    product:z.lazy(()=>ProductScheme),
    user:z.lazy(()=>UserScheme),
    channel:z.lazy(()=>MessageChannelScheme).optional(),
});
export const DiscountMessageRequestScheme:(typeof __base__DiscountMessageRequestScheme)=__base__DiscountMessageRequestScheme.merge(__lazy__DiscountMessageRequestScheme) as any;
export type DiscountMessageRequest=z.infer<typeof __base__DiscountMessageRequestScheme> & {
    product:Product;
    user:User;
    channel?:MessageChannel;
};

const __base__AddedToCartEventScheme=z.object({
});
const __lazy__AddedToCartEventScheme=z.object({
    profile:z.lazy(()=>ProfileScheme),
    product:z.lazy(()=>ProductScheme),
});
export const AddedToCartEventScheme:(typeof __base__AddedToCartEventScheme)=__base__AddedToCartEventScheme.merge(__lazy__AddedToCartEventScheme) as any;
export type AddedToCartEvent=z.infer<typeof __base__AddedToCartEventScheme> & {
    profile:Profile;
    product:Product;
};

const __base__NewUserCreatedEventScheme=z.object({
});
const __lazy__NewUserCreatedEventScheme=z.object({
    user:z.lazy(()=>UserScheme),
});
export const NewUserCreatedEventScheme:(typeof __base__NewUserCreatedEventScheme)=__base__NewUserCreatedEventScheme.merge(__lazy__NewUserCreatedEventScheme) as any;
export type NewUserCreatedEvent=z.infer<typeof __base__NewUserCreatedEventScheme> & {
    user:User;
};

const __base__ProductScheme=z.object({
    id:z.number().int(),
    altId:z.string().max(255).optional(),
    name:z.string().max(255),
    price:z.number(),
});
const __lazy__ProductScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
});
export const ProductScheme:(typeof __base__ProductScheme)=__base__ProductScheme.merge(__lazy__ProductScheme) as any;
export type Product=z.infer<typeof __base__ProductScheme> & {
    events?:EventRecord[];
};

const __base__ActionRecordScheme=z.object({
    /**
     * Name of the action and group.
     * Example = FirstProductDiscount.default
     */
    name:z.string().max(255),
    /**
     * Address of the node storing workers
     */
    nodeAddress:z.string().max(255),
    /**
     * Address of the event that triggers the action.
     * A triggers address is usually the same as its name.
     */
    trigger:z.string().max(255),
});
const __lazy__ActionRecordScheme=z.object({
});
export const ActionRecordScheme:(typeof __base__ActionRecordScheme)=__base__ActionRecordScheme.merge(__lazy__ActionRecordScheme) as any;
export type ActionRecord=z.infer<typeof __base__ActionRecordScheme>;

const __base__ContactRequestScheme=z.object({
    id:z.string().max(255),
    uv:z.number().int(),
    created:z.number(),
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    phone:z.string().max(255).optional(),
    tag:z.string().max(255),
});
const __lazy__ContactRequestScheme=z.object({
});
export const ContactRequestScheme:(typeof __base__ContactRequestScheme)=__base__ContactRequestScheme.merge(__lazy__ContactRequestScheme) as any;
export type ContactRequest=z.infer<typeof __base__ContactRequestScheme>;

const __base__invokeSendContactRequestFnFunctionArgsScheme=z.object({
});
const __lazy__invokeSendContactRequestFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>SendContactRequestScheme),
});
export const invokeSendContactRequestFnFunctionArgsScheme:(typeof __base__invokeSendContactRequestFnFunctionArgsScheme)=__base__invokeSendContactRequestFnFunctionArgsScheme.merge(__lazy__invokeSendContactRequestFnFunctionArgsScheme) as any;
export type invokeSendContactRequestFnFunctionArgs=z.infer<typeof __base__invokeSendContactRequestFnFunctionArgsScheme> & {
    input:SendContactRequest;
};

const __base__SendContactRequestScheme=z.object({
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    phone:z.string().max(255).optional(),
    tag:z.string().max(255),
});
const __lazy__SendContactRequestScheme=z.object({
});
export const SendContactRequestScheme:(typeof __base__SendContactRequestScheme)=__base__SendContactRequestScheme.merge(__lazy__SendContactRequestScheme) as any;
export type SendContactRequest=z.infer<typeof __base__SendContactRequestScheme>;

const __base__SendContactResultScheme=z.object({
    message:z.string().max(255),
});
const __lazy__SendContactResultScheme=z.object({
});
export const SendContactResultScheme:(typeof __base__SendContactResultScheme)=__base__SendContactResultScheme.merge(__lazy__SendContactResultScheme) as any;
export type SendContactResult=z.infer<typeof __base__SendContactResultScheme>;

const __base__invokeSubmitEventsFnFunctionArgsScheme=z.object({
});
const __lazy__invokeSubmitEventsFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>EventSubmissionScheme),
});
export const invokeSubmitEventsFnFunctionArgsScheme:(typeof __base__invokeSubmitEventsFnFunctionArgsScheme)=__base__invokeSubmitEventsFnFunctionArgsScheme.merge(__lazy__invokeSubmitEventsFnFunctionArgsScheme) as any;
export type invokeSubmitEventsFnFunctionArgs=z.infer<typeof __base__invokeSubmitEventsFnFunctionArgsScheme> & {
    input:EventSubmission;
};

const __base__AddressedEventRecordScheme=z.object({
    /**
     * The address event, typically the events type or
     * name. The events address is used to match it to
     * listening actions
     */
    address:z.string().max(255),
    /**
     * The actual event
     */
    event:z.any(),
});
const __lazy__AddressedEventRecordScheme=z.object({
});
export const AddressedEventRecordScheme:(typeof __base__AddressedEventRecordScheme)=__base__AddressedEventRecordScheme.merge(__lazy__AddressedEventRecordScheme) as any;
export type AddressedEventRecord=z.infer<typeof __base__AddressedEventRecordScheme>;

const __base__invokeGetShopifyUserStatusFnFunctionArgsScheme=z.object({
});
const __lazy__invokeGetShopifyUserStatusFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>UserScheme),
});
export const invokeGetShopifyUserStatusFnFunctionArgsScheme:(typeof __base__invokeGetShopifyUserStatusFnFunctionArgsScheme)=__base__invokeGetShopifyUserStatusFnFunctionArgsScheme.merge(__lazy__invokeGetShopifyUserStatusFnFunctionArgsScheme) as any;
export type invokeGetShopifyUserStatusFnFunctionArgs=z.infer<typeof __base__invokeGetShopifyUserStatusFnFunctionArgsScheme> & {
    input:User;
};

export const ShopifyUserStatusScheme=z.enum([
    "good",
    "bad",
    "ok",
]);
export type ShopifyUserStatus=z.infer<typeof ShopifyUserStatusScheme>;

const __base__GetMessageStatusRequestScheme=z.object({
    messageId:z.string().max(255),
});
const __lazy__GetMessageStatusRequestScheme=z.object({
});
export const GetMessageStatusRequestScheme:(typeof __base__GetMessageStatusRequestScheme)=__base__GetMessageStatusRequestScheme.merge(__lazy__GetMessageStatusRequestScheme) as any;
export type GetMessageStatusRequest=z.infer<typeof __base__GetMessageStatusRequestScheme>;

export const MessageChannelScheme=z.enum([
    "email",
    "phone",
    "push",
]);
export type MessageChannel=z.infer<typeof MessageChannelScheme>;

const __base__invokeGetMessageStatusFnFunctionArgsScheme=z.object({
});
const __lazy__invokeGetMessageStatusFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>GetMessageStatusRequestScheme),
});
export const invokeGetMessageStatusFnFunctionArgsScheme:(typeof __base__invokeGetMessageStatusFnFunctionArgsScheme)=__base__invokeGetMessageStatusFnFunctionArgsScheme.merge(__lazy__invokeGetMessageStatusFnFunctionArgsScheme) as any;
export type invokeGetMessageStatusFnFunctionArgs=z.infer<typeof __base__invokeGetMessageStatusFnFunctionArgsScheme> & {
    input:GetMessageStatusRequest;
};

const __base__ContactRequestEventScheme=z.object({
    email:z.string().email(),
    message:z.string().max(255),
});
const __lazy__ContactRequestEventScheme=z.object({
});
export const ContactRequestEventScheme:(typeof __base__ContactRequestEventScheme)=__base__ContactRequestEventScheme.merge(__lazy__ContactRequestEventScheme) as any;
export type ContactRequestEvent=z.infer<typeof __base__ContactRequestEventScheme>;

const __base__invokeSendMessageFnFunctionArgsScheme=z.object({
});
const __lazy__invokeSendMessageFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>SendMessageRequestScheme),
});
export const invokeSendMessageFnFunctionArgsScheme:(typeof __base__invokeSendMessageFnFunctionArgsScheme)=__base__invokeSendMessageFnFunctionArgsScheme.merge(__lazy__invokeSendMessageFnFunctionArgsScheme) as any;
export type invokeSendMessageFnFunctionArgs=z.infer<typeof __base__invokeSendMessageFnFunctionArgsScheme> & {
    input:SendMessageRequest;
};

const __base__SendMessageRequestScheme=z.object({
    email:z.string().email(),
});
const __lazy__SendMessageRequestScheme=z.object({
});
export const SendMessageRequestScheme:(typeof __base__SendMessageRequestScheme)=__base__SendMessageRequestScheme.merge(__lazy__SendMessageRequestScheme) as any;
export type SendMessageRequest=z.infer<typeof __base__SendMessageRequestScheme>;

const __base__ProcessEventsAsyncFunctionArgsScheme=z.object({
    callMap:z.any(),
});
const __lazy__ProcessEventsAsyncFunctionArgsScheme=z.object({
    submission:z.lazy(()=>EventSubmissionScheme),
});
export const ProcessEventsAsyncFunctionArgsScheme:(typeof __base__ProcessEventsAsyncFunctionArgsScheme)=__base__ProcessEventsAsyncFunctionArgsScheme.merge(__lazy__ProcessEventsAsyncFunctionArgsScheme) as any;
export type ProcessEventsAsyncFunctionArgs=z.infer<typeof __base__ProcessEventsAsyncFunctionArgsScheme> & {
    submission:EventSubmission;
};

const __base__EventSubmissionScheme=z.object({
});
const __lazy__EventSubmissionScheme=z.object({
    user:z.lazy(()=>UserScheme),
    events:z.lazy(()=>AddressedEventRecordScheme).array(),
});
export const EventSubmissionScheme:(typeof __base__EventSubmissionScheme)=__base__EventSubmissionScheme.merge(__lazy__EventSubmissionScheme) as any;
export type EventSubmission=z.infer<typeof __base__EventSubmissionScheme> & {
    user:User;
    events:AddressedEventRecord[];
};

const __base__CreateWorkerRequestScheme=z.object({
    address:z.string().max(255),
});
const __lazy__CreateWorkerRequestScheme=z.object({
    user:z.lazy(()=>UserScheme),
});
export const CreateWorkerRequestScheme:(typeof __base__CreateWorkerRequestScheme)=__base__CreateWorkerRequestScheme.merge(__lazy__CreateWorkerRequestScheme) as any;
export type CreateWorkerRequest=z.infer<typeof __base__CreateWorkerRequestScheme> & {
    user:User;
};

const __base__invokeGetUserInfoFnFunctionArgsScheme=z.object({
    /**
     * User id
     */
    input:z.string().max(255),
});
const __lazy__invokeGetUserInfoFnFunctionArgsScheme=z.object({
});
export const invokeGetUserInfoFnFunctionArgsScheme:(typeof __base__invokeGetUserInfoFnFunctionArgsScheme)=__base__invokeGetUserInfoFnFunctionArgsScheme.merge(__lazy__invokeGetUserInfoFnFunctionArgsScheme) as any;
export type invokeGetUserInfoFnFunctionArgs=z.infer<typeof __base__invokeGetUserInfoFnFunctionArgsScheme>;

const __base__invokeCreateUserFnFunctionArgsScheme=z.object({
});
const __lazy__invokeCreateUserFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>UserScheme),
});
export const invokeCreateUserFnFunctionArgsScheme:(typeof __base__invokeCreateUserFnFunctionArgsScheme)=__base__invokeCreateUserFnFunctionArgsScheme.merge(__lazy__invokeCreateUserFnFunctionArgsScheme) as any;
export type invokeCreateUserFnFunctionArgs=z.infer<typeof __base__invokeCreateUserFnFunctionArgsScheme> & {
    input:User;
};

const __base__UserUiEventScheme=z.object({
});
const __lazy__UserUiEventScheme=z.object({
    profile:z.lazy(()=>ProfileScheme),
    uiEvent:z.lazy(()=>UiEventScheme),
});
export const UserUiEventScheme:(typeof __base__UserUiEventScheme)=__base__UserUiEventScheme.merge(__lazy__UserUiEventScheme) as any;
export type UserUiEvent=z.infer<typeof __base__UserUiEventScheme> & {
    profile:Profile;
    uiEvent:UiEvent;
};

export const UiEventTypeScheme=z.enum([
    "click",
    "mouseDown",
    "mouseUp",
]);
export type UiEventType=z.infer<typeof UiEventTypeScheme>;

const __base__UiEventScheme=z.object({
    time:z.number(),
    tags:z.string().max(255).array().optional(),
});
const __lazy__UiEventScheme=z.object({
    type:z.lazy(()=>UiEventTypeScheme),
    target:z.lazy(()=>UiTargetScheme),
});
export const UiEventScheme:(typeof __base__UiEventScheme)=__base__UiEventScheme.merge(__lazy__UiEventScheme) as any;
export type UiEvent=z.infer<typeof __base__UiEventScheme> & {
    type:UiEventType;
    target:UiTarget;
};

const __base__UiTargetScheme=z.object({
    text:z.string().max(255).optional(),
    className:z.string().max(255).optional(),
    elem:z.string().max(255).optional(),
});
const __lazy__UiTargetScheme=z.object({
});
export const UiTargetScheme:(typeof __base__UiTargetScheme)=__base__UiTargetScheme.merge(__lazy__UiTargetScheme) as any;
export type UiTarget=z.infer<typeof __base__UiTargetScheme>;

const __base__invokeSendTemplateMessageFnFunctionArgsScheme=z.object({
});
const __lazy__invokeSendTemplateMessageFnFunctionArgsScheme=z.object({
    input:z.lazy(()=>SendTemplateMessageRequestScheme),
});
export const invokeSendTemplateMessageFnFunctionArgsScheme:(typeof __base__invokeSendTemplateMessageFnFunctionArgsScheme)=__base__invokeSendTemplateMessageFnFunctionArgsScheme.merge(__lazy__invokeSendTemplateMessageFnFunctionArgsScheme) as any;
export type invokeSendTemplateMessageFnFunctionArgs=z.infer<typeof __base__invokeSendTemplateMessageFnFunctionArgsScheme> & {
    input:SendTemplateMessageRequest;
};

const __base__SendTemplateMessageRequestScheme=z.object({
    templateId:z.string().max(255),
    templateData:z.any(),
});
const __lazy__SendTemplateMessageRequestScheme=z.object({
    user:z.lazy(()=>UserScheme),
});
export const SendTemplateMessageRequestScheme:(typeof __base__SendTemplateMessageRequestScheme)=__base__SendTemplateMessageRequestScheme.merge(__lazy__SendTemplateMessageRequestScheme) as any;
export type SendTemplateMessageRequest=z.infer<typeof __base__SendTemplateMessageRequestScheme> & {
    user:User;
};

const __base__EventRecordScheme=z.object({
    id:z.number().int(),
    /**
     * Id of the user profile that triggered
     * the event
     */
    profileId:z.number().int().optional(),
    /**
     * Id of a product associated with the event
     */
    productId:z.number().int().optional(),
    /**
     * Alternate product id
     */
    productAltId:z.string().max(255).optional(),
    /**
     * Id of a location associated with the event
     */
    locationId:z.number().int().optional(),
    /**
     * Alternate location id
     */
    locationAltId:z.string().max(255).optional(),
    /**
     * Id of the account associated with the event
     */
    accountId:z.number().int().optional(),
    /**
     * The events type
     */
    type:z.string().max(255),
    /**
     * A timestamp of when the event occurred
     */
    time:z.number(),
    /**
     * Custom event data
     */
    data:z.record(z.any()).optional(),
    /**
     * A large unindexed string associated with the event
     */
    longText:z.string().optional(),
    /**
     * A short indexed string associated with the event
     */
    text:z.string().max(255).optional(),
    /**
     * Array of tags that can be used to group events
     */
    tags:z.string().max(255).array().optional(),
    /**
     * URL path where the event occurred
     */
    path:z.string().max(255).optional(),
    /**
     * Host / domain where the event occurred
     */
    host:z.string().max(255).optional(),
    /**
     * Name of element associated with
     * the event. Mostly used with elemView
     * events
     */
    elem:z.string().max(255).optional(),
    /**
     * List of classes of the element target triggered the event
     */
    classList:z.string().max(255).array().optional(),
    /**
     * Browser page x
     */
    x:z.number().optional(),
    /**
     * Browser page y
     */
    y:z.number().optional(),
    /**
     * Browser scroll x
     */
    sx:z.number().optional(),
    /**
     * Browser scroll y
     */
    sy:z.number().optional(),
});
const __lazy__EventRecordScheme=z.object({
});
export const EventRecordScheme:(typeof __base__EventRecordScheme)=__base__EventRecordScheme.merge(__lazy__EventRecordScheme) as any;
export type EventRecord=z.infer<typeof __base__EventRecordScheme>;
export const EventRecordToAlias={
    "profileId": {
        "default": "i",
        "all": [
            "i"
        ]
    },
    "productId": {
        "default": "j",
        "all": [
            "j"
        ]
    },
    "productAltId": {
        "default": "ja",
        "all": [
            "ja"
        ]
    },
    "locationId": {
        "default": "l",
        "all": [
            "l"
        ]
    },
    "locationAltId": {
        "default": "la",
        "all": [
            "la"
        ]
    },
    "accountId": {
        "default": "a",
        "all": [
            "a"
        ]
    },
    "type": {
        "default": "t",
        "all": [
            "t"
        ]
    },
    "time": {
        "default": "o",
        "all": [
            "o"
        ]
    },
    "longText": {
        "default": "m",
        "all": [
            "m"
        ]
    },
    "text": {
        "default": "k",
        "all": [
            "k"
        ]
    },
    "tags": {
        "default": "g",
        "all": [
            "g"
        ]
    },
    "path": {
        "default": "p",
        "all": [
            "p"
        ]
    },
    "host": {
        "default": "h",
        "all": [
            "h"
        ]
    },
    "elem": {
        "default": "e",
        "all": [
            "e"
        ]
    },
    "classList": {
        "default": "c",
        "all": [
            "c"
        ]
    }
}
export const EventRecordFromAlias={
    "i": {
        "default": "profileId",
        "all": [
            "profileId"
        ]
    },
    "j": {
        "default": "productId",
        "all": [
            "productId"
        ]
    },
    "ja": {
        "default": "productAltId",
        "all": [
            "productAltId"
        ]
    },
    "l": {
        "default": "locationId",
        "all": [
            "locationId"
        ]
    },
    "la": {
        "default": "locationAltId",
        "all": [
            "locationAltId"
        ]
    },
    "a": {
        "default": "accountId",
        "all": [
            "accountId"
        ]
    },
    "t": {
        "default": "type",
        "all": [
            "type"
        ]
    },
    "o": {
        "default": "time",
        "all": [
            "time"
        ]
    },
    "m": {
        "default": "longText",
        "all": [
            "longText"
        ]
    },
    "k": {
        "default": "text",
        "all": [
            "text"
        ]
    },
    "g": {
        "default": "tags",
        "all": [
            "tags"
        ]
    },
    "p": {
        "default": "path",
        "all": [
            "path"
        ]
    },
    "h": {
        "default": "host",
        "all": [
            "host"
        ]
    },
    "e": {
        "default": "elem",
        "all": [
            "elem"
        ]
    },
    "c": {
        "default": "classList",
        "all": [
            "classList"
        ]
    }
}

const __base__AccountScheme=z.object({
    id:z.number().int(),
    timezone:z.string().max(255),
    industry:z.string().max(255).optional(),
    mfaRequired:z.boolean().optional(),
    /**
     * The min number of milliseconds between
     * sending messages to a single profile
     * excluding transactional messages
     */
    minProfileSendIntervalMs:z.number().int().optional(),
    messageSubjectPreviewPrefix:z.string().max(255).optional(),
    placeEmailTrackingPixelAtBottom:z.boolean().optional(),
});
const __lazy__AccountScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
    regions:z.lazy(()=>RegionScheme).array().optional(),
    locations:z.lazy(()=>LocationScheme).array().optional(),
    users:z.lazy(()=>UserScheme).array().optional(),
    profiles:z.lazy(()=>ProfileScheme).array().optional(),
    apiKeys:z.lazy(()=>ApiKeyScheme).array().optional(),
    messageTemplates:z.lazy(()=>MessageTemplateScheme).array().optional(),
    messageSenders:z.lazy(()=>MessageSenderScheme).array().optional(),
    messageDeliveries:z.lazy(()=>MessageDeliveryScheme).array().optional(),
    currency:z.lazy(()=>CurrencyScheme),
    emailAttributionType:z.lazy(()=>EmailAttributionEventTypeScheme).optional(),
});
export const AccountScheme:(typeof __base__AccountScheme)=__base__AccountScheme.merge(__lazy__AccountScheme) as any;
/**
 * Client accounts
 */
export type Account=z.infer<typeof __base__AccountScheme> & {
    events?:EventRecord[];
    regions?:Region[];
    locations?:Location[];
    users?:User[];
    profiles?:Profile[];
    apiKeys?:ApiKey[];
    messageTemplates?:MessageTemplate[];
    messageSenders?:MessageSender[];
    messageDeliveries?:MessageDelivery[];
    currency:Currency;
    emailAttributionType?:EmailAttributionEventType;
};

const __base__UserScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    phone:z.string().max(255).optional(),
    accountId:z.number().int(),
    roles:z.string().max(255).array(),
});
const __lazy__UserScheme=z.object({
    activity:z.lazy(()=>UserActivityLogEntryScheme).array(),
    notificationDevices:z.lazy(()=>NotificationDeviceScheme).array().optional(),
    targetedMessages:z.lazy(()=>MessageTargetScheme).array().optional(),
});
export const UserScheme:(typeof __base__UserScheme)=__base__UserScheme.merge(__lazy__UserScheme) as any;
/**
 * A user within an organization
 */
export type User=z.infer<typeof __base__UserScheme> & {
    activity:UserActivityLogEntry[];
    notificationDevices?:NotificationDevice[];
    targetedMessages?:MessageTarget[];
};

const __base__LocationScheme=z.object({
    id:z.number().int(),
    regionId:z.number().int().optional(),
    accountId:z.number().int().optional(),
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    domain:z.string().max(255).optional(),
    phone:z.string().max(255).optional(),
    country:z.string().max(255).optional(),
    state:z.string().max(255).optional(),
    city:z.string().max(255).optional(),
    address:z.string().max(255).optional(),
    address2:z.string().max(255).optional(),
    postalCode:z.string().max(255).optional(),
});
const __lazy__LocationScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
    profiles:z.lazy(()=>ProfileScheme).array().optional(),
});
export const LocationScheme:(typeof __base__LocationScheme)=__base__LocationScheme.merge(__lazy__LocationScheme) as any;
/**
 * Can either be a physical or digital location
 */
export type Location=z.infer<typeof __base__LocationScheme> & {
    events?:EventRecord[];
    profiles?:Profile[];
};

const __base__RegionScheme=z.object({
    id:z.number().int(),
    accountId:z.number().int().optional(),
});
const __lazy__RegionScheme=z.object({
    locations:z.lazy(()=>LocationScheme).array().optional(),
});
export const RegionScheme:(typeof __base__RegionScheme)=__base__RegionScheme.merge(__lazy__RegionScheme) as any;
export type Region=z.infer<typeof __base__RegionScheme> & {
    locations?:Location[];
};

const __base__UserActivityLogEntryScheme=z.object({
    id:z.number().int(),
    userId:z.number().int().optional(),
});
const __lazy__UserActivityLogEntryScheme=z.object({
});
export const UserActivityLogEntryScheme:(typeof __base__UserActivityLogEntryScheme)=__base__UserActivityLogEntryScheme.merge(__lazy__UserActivityLogEntryScheme) as any;
/**
 * Used to track the actions of organization
 * users.
 */
export type UserActivityLogEntry=z.infer<typeof __base__UserActivityLogEntryScheme>;

const __base__SessionScheme=z.object({
    startTime:z.number(),
    endTime:z.number(),
});
const __lazy__SessionScheme=z.object({
    events:z.lazy(()=>EventRecordScheme).array().optional(),
});
export const SessionScheme:(typeof __base__SessionScheme)=__base__SessionScheme.merge(__lazy__SessionScheme) as any;
/**
 * Represents a group of events group
 * by time
 */
export type Session=z.infer<typeof __base__SessionScheme> & {
    events?:EventRecord[];
};

const __base__ProfileGroupScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).optional(),
    description:z.string().optional(),
    query:z.record(z.any()).optional(),
    lastUserCount:z.number().int().optional(),
});
const __lazy__ProfileGroupScheme=z.object({
    type:z.lazy(()=>ProfileGroupTypeScheme),
    placedProfiles:z.lazy(()=>ProfileGroupPlacementScheme).array().optional(),
});
export const ProfileGroupScheme:(typeof __base__ProfileGroupScheme)=__base__ProfileGroupScheme.merge(__lazy__ProfileGroupScheme) as any;
/**
 * Represents an audience or list of profiles.
 * Profile groups consists of profiles included by the
 * the groups query and by profiles that are directly
 * placed in the group via ProfileGroupPlacement records.
 */
export type ProfileGroup=z.infer<typeof __base__ProfileGroupScheme> & {
    type:ProfileGroupType;
    placedProfiles?:ProfileGroupPlacement[];
};

const __base__ProfileGroupPlacementScheme=z.object({
    id:z.number().int(),
    created:z.number(),
    /**
     * The time when the profile placement was disabled.
     * For historical purposes profile placements are never
     * deleted they are only disabled.
     */
    disabledAt:z.number().optional(),
    profileId:z.number().int(),
    groupId:z.number().int(),
});
const __lazy__ProfileGroupPlacementScheme=z.object({
});
export const ProfileGroupPlacementScheme:(typeof __base__ProfileGroupPlacementScheme)=__base__ProfileGroupPlacementScheme.merge(__lazy__ProfileGroupPlacementScheme) as any;
export type ProfileGroupPlacement=z.infer<typeof __base__ProfileGroupPlacementScheme>;

export const SubscriptionStatusScheme=z.enum([
    "unverified",
    "subscribed",
    "unsubscribed",
]);
export type SubscriptionStatus=z.infer<typeof SubscriptionStatusScheme>;

const __base__ApiKeyScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).optional(),
    expires:z.number(),
    accountId:z.number().int().optional(),
    key:z.string(),
    roles:z.string().max(255).array(),
});
const __lazy__ApiKeyScheme=z.object({
});
export const ApiKeyScheme:(typeof __base__ApiKeyScheme)=__base__ApiKeyScheme.merge(__lazy__ApiKeyScheme) as any;
export type ApiKey=z.infer<typeof __base__ApiKeyScheme>;

export const ProfileGroupTypeScheme=z.enum([
    "list",
    "audience",
]);
export type ProfileGroupType=z.infer<typeof ProfileGroupTypeScheme>;

export const CommonEventTypesAry=[
    "click",
    "pageView",
    "pageHidden",
    "pageVisible",
    "elemView",
    "mouseover",
    "mouseout",
    "mousedown",
    "mouseup",
    "touchstart",
    "touchend",
    "touchmove",
    "console",
];

export const CommonEventTypesMap={
    "click":"click",
    "pageView":"pageView",
    "pageHidden":"pageHidden",
    "pageVisible":"pageVisible",
    "elemView":"elemView",
    "mouseover":"mouseover",
    "mouseout":"mouseout",
    "mousedown":"mousedown",
    "mouseup":"mouseup",
    "touchstart":"touchstart",
    "touchend":"touchend",
    "touchmove":"touchmove",
    "console":"console",
};
export const CommonEventTypesToAlias={
    "click": {
        "default": "c",
        "all": [
            "c"
        ]
    },
    "pageView": {
        "default": "v",
        "all": [
            "v"
        ]
    },
    "pageHidden": {
        "default": "ph",
        "all": [
            "ph"
        ]
    },
    "pageVisible": {
        "default": "pv",
        "all": [
            "pv"
        ]
    },
    "elemView": {
        "default": "ev",
        "all": [
            "ev"
        ]
    },
    "mouseover": {
        "default": "o",
        "all": [
            "o"
        ]
    },
    "mouseout": {
        "default": "j",
        "all": [
            "j"
        ]
    },
    "mousedown": {
        "default": "d",
        "all": [
            "d"
        ]
    },
    "mouseup": {
        "default": "u",
        "all": [
            "u"
        ]
    },
    "touchstart": {
        "default": "ts",
        "all": [
            "ts"
        ]
    },
    "touchend": {
        "default": "td",
        "all": [
            "td"
        ]
    },
    "touchmove": {
        "default": "tm",
        "all": [
            "tm"
        ]
    },
    "console": {
        "default": "l",
        "all": [
            "l"
        ]
    }
}
export const CommonEventTypesFromAlias={
    "c": {
        "default": "click",
        "all": [
            "click"
        ]
    },
    "v": {
        "default": "pageView",
        "all": [
            "pageView"
        ]
    },
    "ph": {
        "default": "pageHidden",
        "all": [
            "pageHidden"
        ]
    },
    "pv": {
        "default": "pageVisible",
        "all": [
            "pageVisible"
        ]
    },
    "ev": {
        "default": "elemView",
        "all": [
            "elemView"
        ]
    },
    "o": {
        "default": "mouseover",
        "all": [
            "mouseover"
        ]
    },
    "j": {
        "default": "mouseout",
        "all": [
            "mouseout"
        ]
    },
    "d": {
        "default": "mousedown",
        "all": [
            "mousedown"
        ]
    },
    "u": {
        "default": "mouseup",
        "all": [
            "mouseup"
        ]
    },
    "ts": {
        "default": "touchstart",
        "all": [
            "touchstart"
        ]
    },
    "td": {
        "default": "touchend",
        "all": [
            "touchend"
        ]
    },
    "tm": {
        "default": "touchmove",
        "all": [
            "touchmove"
        ]
    },
    "l": {
        "default": "console",
        "all": [
            "console"
        ]
    }
}

const __base__MessageTemplateScheme=z.object({
    id:z.number().int(),
    name:z.string().max(255).optional(),
    created:z.number().optional(),
    subject:z.string().max(255).optional(),
    accountId:z.number().int().optional(),
    iconUrl:z.string().max(255).optional(),
    published:z.boolean().optional(),
    body:z.record(z.any()).optional(),
    tags:z.string().max(255).array().optional(),
    previewText:z.string().optional(),
    senderId:z.number().int(),
    customUnsubscribeLink:z.string().optional(),
    trackingEnabled:z.boolean().optional(),
    includePlatformBranding:z.boolean().optional(),
});
const __lazy__MessageTemplateScheme=z.object({
    type:z.lazy(()=>MessageTypeScheme),
    deliveries:z.lazy(()=>MessageDeliveryScheme).array().optional(),
});
export const MessageTemplateScheme:(typeof __base__MessageTemplateScheme)=__base__MessageTemplateScheme.merge(__lazy__MessageTemplateScheme) as any;
export type MessageTemplate=z.infer<typeof __base__MessageTemplateScheme> & {
    type:MessageType;
    deliveries?:MessageDelivery[];
};

export const MessageTypeScheme=z.enum([
    "email",
    "emailText",
    "sms",
    "notification",
]);
export type MessageType=z.infer<typeof MessageTypeScheme>;

const __base__MessageSenderScheme=z.object({
    id:z.number().int(),
    isDefault:z.boolean().optional(),
    name:z.string().max(255).optional(),
    email:z.string().email().optional(),
    emailVerified:z.boolean().optional(),
    phone:z.string().max(255).optional(),
    phoneVerified:z.boolean().optional(),
    website:z.string().max(255).optional(),
    accountId:z.number().int().optional(),
});
const __lazy__MessageSenderScheme=z.object({
    messageTemplates:z.lazy(()=>MessageTemplateScheme).array().optional(),
});
export const MessageSenderScheme:(typeof __base__MessageSenderScheme)=__base__MessageSenderScheme.merge(__lazy__MessageSenderScheme) as any;
export type MessageSender=z.infer<typeof __base__MessageSenderScheme> & {
    messageTemplates?:MessageTemplate[];
};

export const CurrencyScheme=z.enum([
    "usd",
]);
export type Currency=z.infer<typeof CurrencyScheme>;

export const CommonUserRolesAry=[
    "admin",
];

const __base__AccountDomainScheme=z.object({
    id:z.string().max(255),
    verified:z.boolean().optional(),
    /**
     * Used with TXT records to verify domain ownership
     */
    verificationCode:z.string().max(255).optional(),
    /**
     * Verification is not required for data collection
     * to be enabled.
     */
    dataCollectionEnabled:z.boolean().optional(),
});
const __lazy__AccountDomainScheme=z.object({
});
export const AccountDomainScheme:(typeof __base__AccountDomainScheme)=__base__AccountDomainScheme.merge(__lazy__AccountDomainScheme) as any;
export type AccountDomain=z.infer<typeof __base__AccountDomainScheme>;

export const EmailAttributionEventTypeScheme=z.enum([
    "openOrClick",
    "openOrClickExclueApplePrivacy",
    "click",
]);
export type EmailAttributionEventType=z.infer<typeof EmailAttributionEventTypeScheme>;

const __base__MessageDeliveryScheme=z.object({
    id:z.number().int(),
    created:z.number(),
    templateId:z.number().int(),
    accountId:z.number().int().optional(),
});
const __lazy__MessageDeliveryScheme=z.object({
    targets:z.lazy(()=>MessageTargetScheme).array().optional(),
});
export const MessageDeliveryScheme:(typeof __base__MessageDeliveryScheme)=__base__MessageDeliveryScheme.merge(__lazy__MessageDeliveryScheme) as any;
export type MessageDelivery=z.infer<typeof __base__MessageDeliveryScheme> & {
    targets?:MessageTarget[];
};

const __base__MessageTargetScheme=z.object({
    id:z.number().int(),
    deliveryId:z.number().int(),
    email:z.string().email().optional(),
    phone:z.string().max(255).optional(),
    deviceId:z.number().int().optional(),
    profileId:z.number().int().optional(),
    userId:z.number().int().optional(),
});
const __lazy__MessageTargetScheme=z.object({
});
export const MessageTargetScheme:(typeof __base__MessageTargetScheme)=__base__MessageTargetScheme.merge(__lazy__MessageTargetScheme) as any;
export type MessageTarget=z.infer<typeof __base__MessageTargetScheme>;

const __base__NotificationDeviceScheme=z.object({
    id:z.number().int(),
    profileId:z.number().int().optional(),
    userId:z.number().int().optional(),
});
const __lazy__NotificationDeviceScheme=z.object({
    targetedMessages:z.lazy(()=>MessageTargetScheme).array().optional(),
});
export const NotificationDeviceScheme:(typeof __base__NotificationDeviceScheme)=__base__NotificationDeviceScheme.merge(__lazy__NotificationDeviceScheme) as any;
export type NotificationDevice=z.infer<typeof __base__NotificationDeviceScheme> & {
    targetedMessages?:MessageTarget[];
};
