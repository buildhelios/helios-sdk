import { UiView } from "./UiView";
import { hs } from "./hubble-style";

interface ElemOverlayProps
{
    color?:string;
    opacityHex?:string;
}

export class ElemOverlay extends UiView
{

    private _target:HTMLElement|null=null;
    public get target(){return this._target}
    public set target(value:HTMLElement|null){
        if(this._target===value){return}
        this._target=value;
        this.render();
    }

    private _enabled=true;
    public get enabled(){return this._enabled}
    public set enabled(value:boolean){
        if(this._enabled===value){return}
        this._enabled=value;
        this.render();
    }

    public constructor({
        color=hs.primaryColor,
        opacityHex='77'
    }:ElemOverlayProps={})
    {
        super({
            style:{
                position:'fixed',
                zIndex:99999,
                backgroundColor:color+opacityHex,
                border:'2px solid '+color,
                borderRadius:hs.borderRadius,
                pointerEvents:'none',
                left:'100px',
                top:'100px',
                height:'100px',
                width:'100px',
                display:'none',
            }
        })
    }

    protected override onRender(): void {

        if(!this._target || !this._enabled){
            this.elem.style.display='none';
            return;
        }

        const box=this._target.getBoundingClientRect();
        this.elem.style.display='flex';
        this.elem.style.left=box.x+'px';
        this.elem.style.top=box.y+'px';
        this.elem.style.width=box.width+'px';
        this.elem.style.height=box.height+'px';
    }
}
