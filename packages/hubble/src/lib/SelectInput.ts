import { escapeHtml } from "@iyio/common";
import { UiView, UiViewEventProps } from "./UiView";
import { icons } from "./hubble-icons";
import { colStyle, hs } from "./hubble-style";

interface SelectOption
{
    name:string;
    value:string;
}

interface SelectInputProps
{
    title?:string;
    placeholder?:string;
    value?:string;
    options:SelectOption[];
    onChange?:(value:string)=>void;
}

export class SelectInput extends UiView
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
        title,
        options,
        onChange,
        ...props
    }:SelectInputProps & UiViewEventProps<SelectInput>){

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
                    style:{
                        borderRadius:hs.smBorderRadius,
                        padding:'12px',
                        border:'2px solid '+hs.inputBorderColor,
                        backgroundColor:hs.inputColor,
                        position:'relative',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                    },
                    children:[
                        {
                            type:'span',
                            style:{
                                fontSize:hs.mdFontSize,
                            },
                            beforeRender:view=>{
                                const match=options.find(o=>o.value===this._value);
                                view.elem.innerText=match?.name||this._value||placeholder;
                                view.elem.style.color=this.value?'#ffffff':'#757575';
                            },
                        },
                        icons.chevronDown(),
                        {
                            type:'select',
                            style:{
                                position:'absolute',
                                opacity:0,
                                left:'0px',
                                right:'0px',
                                top:'0px',
                                bottom:'0px',
                            },
                            listeners:{
                                change:(e)=>{
                                    this._value=(e.target as HTMLSelectElement).value;
                                    onChange?.(this._value);
                                    this.render();
                                }
                            },
                            innerHTML:(
                                `<option value="">${escapeHtml(placeholder||'Select a value')}</option>`+
                                options.map(o=>(
                                    `<option${value===o.value?' selected':''} value="${escapeHtml(o.value)}">${escapeHtml(o.name)}</option>`
                                )).join('')
                            )

                        }
                    ]
                },



            ]

        })

        this._value=value;
    }
}
