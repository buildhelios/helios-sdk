/* <ALLOW_AUTO_DELETE DEPENDENCIES="LayoutTransition" /> */
// this file was auto generated by @iyio/protogen - https://github.com/iyioio/common/tree/main/packages/protogen

const unionAry=[
    "none",
    "fade",
    "slide"
] as const;
Object.freeze(unionAry);

export type LayoutTransition=typeof unionAry[number];

export const allLayoutTransitionAry:LayoutTransition[]=unionAry as any;
