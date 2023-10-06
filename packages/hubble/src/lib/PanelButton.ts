import { UiView } from "./UiView";
import { IconType, icons } from "./hubble-icons";
import { hs } from "./hubble-style";

interface PanelButtonProps
{
    onClick?:()=>void;
    icon:IconType;
    title:string;
    text?:string;
    rightIcon?:IconType;
}

export class PanelButton extends UiView
{

    public constructor({
        icon,
        title,
        text,
        rightIcon,
        onClick
    }:PanelButtonProps){
        super({
            type:onClick?'button':'div',
            listeners:{
                click:()=>{
                    onClick?.();
                }
            },
            style:{
                borderRadius:hs.borderRadius,
                flexDirection:'row',
                alignItems:'center',
                gap:hs.spaceMd,
                padding:hs.spaceMd,
                border:'2px solid '+hs.borderColor,
                cursor:onClick?'pointer':undefined,
                transition:'border 0.2s ease-in-out',
            },
            hoverStyle:{
                border:'2px solid '+hs.primaryColor,
            },
            children:[
                icons[icon](),
                {
                    type:'div',
                    style:{
                        flexDirection:'column',
                        gap:hs.spaceSm
                    },
                    children:[
                        {
                            type:'h2',
                            style:{
                                fontSize:hs.mdFontSize,
                            },
                            children:title,
                        },
                        text&&{
                            type:'span',
                            style:{
                                color:hs.mutedColor,
                                fontSize:hs.smFontSize,
                            },
                            children:text,
                        },
                    ]
                },
                rightIcon&&icons[rightIcon]()
            ]
        })
    }
}
