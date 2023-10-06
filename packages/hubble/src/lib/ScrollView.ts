import type { CSSProperties } from "react";
import { UiView, UiViewChildren } from "./UiView";
import { hs } from "./hubble-style";

interface ScrollViewProps
{
    maxHeight?:string;
    minHeight?:string;
    style?:CSSProperties;
    innerStyle?:CSSProperties;
    children?:UiViewChildren;
}

export class ScrollView extends UiView
{

    public constructor({
        maxHeight,
        minHeight,
        style={},
        innerStyle={},
        children
    }:ScrollViewProps){
        super({

            style:{
                flex:1,
                ...style,
                maxHeight,
                minHeight,
                flexDirection:'column',
                position:"relative",
                margin:`0 -${hs.spaceLg} -${hs.spaceLg} -${hs.spaceLg}`,
            },

            children:{
                type:'div',
                className:'__hubble-scroll-bars',
                style:{
                    position:'absolute',
                    left:'0px',
                    right:'0px',
                    top:'0px',
                    bottom:'0px',
                    display:'block',
                    overflowX:'hidden',
                    overflowY:'overlay' as any,
                    padding:`0 ${hs.spaceLg} ${hs.spaceLg} ${hs.spaceLg}`,
                },
                children:{
                    type:'div',
                    style:{
                        ...innerStyle,
                        flexDirection:'column',
                    },
                    children
                }
            }
        })
    }
}
