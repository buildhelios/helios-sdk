import { asType } from "@iyio/common";
import { UiViewProps } from "./UiView";
import { hs } from "./hubble-style";

export const hsComps={
    hr:asType<UiViewProps>({
        type:'hr',
        style:{
            height:'1px',
            backgroundColor:hs.borderColor,
            margin:hs.spaceSm+' 0',
        }
    })
} as const
