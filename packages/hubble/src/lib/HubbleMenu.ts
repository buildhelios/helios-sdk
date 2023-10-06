import { Hubble } from "./Hubble";
import { MainMenuView } from "./MainMenuView";
import { SelectView } from "./SelectView";
import { SignInView } from "./SignInView";
import { TargetView } from "./TargetView";
import { UiView } from "./UiView";
import { hs } from "./hubble-style";
import { HubblePos, HubbleTarget } from "./hubble-types";

export type HubbleMode='sign-in'|'main-menu'|'select'|'target';

export type HubbleModeState=
{
    type:'sign-in'|'main-menu'|'select',
} |
{
    type:'target',
    target?:HubbleTarget,
}

export class HubbleMenu extends UiView
{


    private readonly hubble:Hubble;

    private modeView:UiView|null=null;

    private _mode:HubbleModeState={type:'sign-in'};
    public get mode(){return this._mode}
    public set mode(value:HubbleModeState){
        if(value===this._mode){
            return;
        }
        this._mode=value;
        this.updateMode();
    }

    private _open=false;
    public get open(){return this._open}
    public set open(value:boolean){
        if(this._open===value){return}
        this._open=value;
        this.elem.style.display=value?'flex':'none';
        if(value && !this.elem.parentElement){
            this.setParentElement(document.body);
        }
    }

    private _position:HubblePos={x:0,y:0};
    public get position(){return this._position}
    public set position(value:HubblePos){
        if(this._position===value){return}
        this._position=value;
        this.elem.style.transform=`translate(${value.x}px,${value.y}px)`
    }



    public constructor(hubble:Hubble)
    {
        super({
            type:'div',
            style:{
                position:'fixed',
                background:hs.panelColor,
                borderRadius:hs.lgBorderRadius,
                boxShadow:'0 0 10px #00000055',
                width:'450px',
                right:'24px',
                top:'24px',
                zIndex:'10000',
                padding:hs.spaceLg,
                gap:hs.spaceLg,
                flexDirection:'column',
            },
        })

        this.hubble=hubble;

        this.updateMode();
    }

    private updateMode()
    {
        if(this.modeView){
            this.modeView.dispose();
            this.modeView=null;
        }

        switch(this._mode.type){

            case 'sign-in':
                this.modeView=new SignInView(this.hubble);
                break;

            case 'main-menu':
                this.modeView=new MainMenuView(this.hubble);
                break;

            case 'select':
                this.modeView=new SelectView(this.hubble);
                break;

            case 'target':
                this.modeView=new TargetView(this.hubble);
                break;
        }

        if(this.modeView){
            this.addChild(this.modeView);
        }
    }
}
