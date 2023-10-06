import { Button } from "./Button";
import { Head } from "./Head";
import { Hubble } from "./Hubble";
import { PanelButton } from "./PanelButton";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";
import { UiView } from "./UiView";
import { hsComps } from "./hubble-comps";
import { colStyle, hs } from "./hubble-style";
import { HubbleTarget, createHubbleTarget } from "./hubble-types";

export class TargetView extends UiView
{

    private readonly target:HubbleTarget;

    public constructor(hubble:Hubble)
    {
        const defaultTarget=hubble.menu.mode.type==='target' && hubble.menu.mode.target?
            hubble.menu.mode.target:
            (hubble.currentTarget??createHubbleTarget(document.body))

        super({
            style:colStyle,
            children:[
                new Head({hubble}),
                hsComps.hr,

                new PanelButton({
                    icon:'pointer',
                    title:'Change Target Element',
                    onClick:()=>hubble.menu.mode={type:'select'}
                }),

                new TextInput({
                    title:'Target Name',
                    placeholder:'Enter a name for this target',
                    beforeRender:view=>{
                        console.log('render name',this.target)
                        view.value=this.target.name;
                    },
                    onChange:value=>this.target.name=value,

                }),

                new TextInput({
                    title:'CSS Selector',
                    placeholder:'Enter a CSS Selector',
                    beforeRender:view=>{
                        view.value=this.target.selector;
                    },
                    onChange:value=>this.target.selector=value,

                }),

                new TextInput({
                    title:'Focus',
                    placeholder:'Enter target inner text',
                    beforeRender:view=>{
                        view.value=this.target.innerText??'';
                    },
                    onChange:value=>this.target.innerText=value,

                }),

                new SelectInput({
                    title:'Trigger type',
                    placeholder:'Select a target type',
                    value:defaultTarget.triggerType,
                    beforeRender:view=>{
                        view.value=this.target.triggerType??'';
                    },
                    onChange:value=>this.target.triggerType=value,
                    options:[
                        {name:'Click',value:'click'},
                        {name:'Mouse Down',value:'mousedown'},
                        {name:'Mouse Up',value:'mouseup'},
                        {name:'Mouse Over',value:'mouseenter'},
                    ]
                }),

                new TextInput({
                    title:'Tags',
                    placeholder:'Comma separated list of tags',
                    beforeRender:view=>{
                        view.value=this.target.tags??'';
                    },
                    onChange:value=>this.target.tags=value,
                }),

                {
                    style:{
                        flexDirection:'row',
                        gap:hs.spaceMd,
                        justifyContent:'flex-end'
                    },
                    children:[
                        new Button({
                            text:'Discard',
                            type:'danger',
                            style:{
                                marginRight:'auto'
                            },
                            onClick:()=>{
                                hubble.deleteTarget(this.target.id);
                                hubble.currentTarget=null;
                                hubble.menu.mode={type:'main-menu'};
                            }
                        }),
                        new Button({
                            text:'Cancel',
                            type:'default',
                            onClick:()=>{
                                hubble.currentTarget=null;
                                hubble.menu.mode={type:'main-menu'};
                            }
                        }),
                        new Button({
                            text:'Save',
                            type:'primary',
                            onClick:()=>{
                                hubble.saveTarget(this.target);
                                hubble.currentTarget=null;
                                hubble.menu.mode={type:'main-menu'};

                            }
                        }),
                    ]
                }


            ]
        });

        this.target=defaultTarget;
        hubble.currentTarget=this.target;
        console.log('target view',this)
    }
}
