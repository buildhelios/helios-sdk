/* <ALLOW_AUTO_DELETE DEPENDENCIES="StripeIntervalType" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen

const unionAry=[
    "day",
    "week",
    "month",
    "year"
] as const;
Object.freeze(unionAry);

export type StripeIntervalType=typeof unionAry[number];

export const allStripeIntervalTypeAry:StripeIntervalType[]=unionAry as any;
