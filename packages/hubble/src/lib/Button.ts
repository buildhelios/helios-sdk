import type { CSSProperties } from "react";
import { UiView, UiViewEventProps } from "./UiView";
import { hs } from "./hubble-style";

export type ButtonType='primary'|'danger'|'default'|'secondary';

interface ButtonProps extends UiViewEventProps<Button>
{
    text?:string;
    onClick?:()=>void;
    type?:ButtonType;
    disabled?:boolean;
    style?:CSSProperties;
}

export class Button extends UiView<HTMLButtonElement>
{



    private _type:ButtonType='default';
    public get type(){return this._type??'default'}
    public set type(value:ButtonType){
        if(this._type===value){return}
        this._type=value;
        this.render();
    }

    private _disabled=false;
    public get disabled(){return this._disabled}
    public set disabled(value:boolean){
        if(this._disabled===value){return}
        this._disabled=value;
        this.render();
    }

    public constructor({
        onClick,
        text,
        type='default',
        disabled=false,
        style={},
        ...props
    }:ButtonProps){

        super({
            ...(props as UiViewEventProps),
            type:'button',
            listeners:{
                click:()=>{
                    onClick?.();
                }
            },
            children:text,
            style:{
                borderRadius:hs.smBorderRadius,
                padding:'8px 16px',
                cursor:onClick?'pointer':undefined,
                justifyContent:'center',
                alignItems:'center',
                ...style
            }

        })

        this._type=type;
        this._disabled=disabled;
    }

    protected override onRender():void
    {
        let color='none';
        let border='none';

        const type=this.disabled?'secondary':this._type;

        switch(type){

            case 'primary':
                color=hs.primaryColor;
                break;

            case 'secondary':
                color=hs.lightGray;
                break;

            case 'danger':
                color=hs.dangerColor;
                break;

            case 'default':
            default:
                border='1px solid '+hs.borderColor;
                break;
        }

        this.elem.style.background=color;
        this.elem.style.border=border;
        this.elem.disabled=this._disabled;
        this.elem.style.cursor=this._disabled?'not-allowed':'pointer'
    }
}
