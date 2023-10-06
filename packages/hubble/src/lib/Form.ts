import type { CSSProperties } from "react";
import { UiView, UiViewChildren, UiViewEventProps } from "./UiView";
import { colStyle } from "./hubble-style";

export type FormType='primary'|'danger'|'default'|'secondary';

interface FormProps extends UiViewEventProps<Form>
{
    onSubmit?:()=>void;
    children?:UiViewChildren;
    style?:CSSProperties;
}

export class Form extends UiView<HTMLFormElement>
{
    private _type:FormType='default';
    public get type(){return this._type??'default'}
    public set type(value:FormType){
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
        onSubmit,
        children,
        style={},
        ...props
    }:FormProps){

        super({
            ...(props as UiViewEventProps),
            type:'form',
            listeners:{
                submit:(e)=>{
                    e.preventDefault();
                    onSubmit?.();
                }
            },
            children:children,
            style:{
                ...colStyle,
                ...style
            }

        })

    }
}
