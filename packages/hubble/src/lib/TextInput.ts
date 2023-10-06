import { UiView, UiViewEventProps } from "./UiView";
import { colStyle, hs } from "./hubble-style";


interface TextInputProps
{
    title?:string;
    type?:'text'|'email'|'password';
    placeholder?:string;
    value?:string;
    onChange?:(value:string)=>void;
}

export class TextInput extends UiView
{

    private _value:string;
    public get value(){return this._value}
    public set value(value:string){
        if(this._value===value){return}
        this._value=value;
        this.render();
    }

    public constructor({
        placeholder='',
        value='',
        type='text',
        title,
        onChange,
        ...props
    }:TextInputProps & UiViewEventProps<TextInput>){

        super({
            ...(props as UiViewEventProps),
            style:{
                ...colStyle,
                gap:hs.spaceSm,
            },
            children:[
                title && {
                    type:'span',
                    style:{
                        color:hs.mutedColor,
                        fontSize:hs.xsFontSize,
                    },
                    children:title
                },
                {
                    type:'input',
                    init:view=>{
                        (view.elem as HTMLInputElement).type=type;
                        (view.elem as HTMLInputElement).placeholder=placeholder;
                        if(type==='password'){
                            (view.elem as HTMLInputElement).autocomplete='current-password';
                        }else if(type==='email'){
                            (view.elem as HTMLInputElement).autocomplete='email';
                        }
                    },
                    beforeRender:view=>{
                        (view.elem as HTMLInputElement).value=this._value;
                    },
                    listeners:{
                        input:(e)=>{
                            this._value=(e.target as HTMLInputElement).value;
                            onChange?.(this._value);
                        }
                    },
                    style:{
                        borderRadius:hs.smBorderRadius,
                        padding:'12px',
                        fontSize:hs.mdFontSize,
                        border:'2px solid '+hs.inputBorderColor,
                        backgroundColor:hs.inputColor,
                    }
                }
            ]

        })

        this._value=value;
    }
}
