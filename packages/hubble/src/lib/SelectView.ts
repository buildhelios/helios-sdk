import { Button } from "./Button";
import { ElemOverlay } from "./ElemOverlay";
import { Head } from "./Head";
import { Hubble } from "./Hubble";
import { UiView } from "./UiView";
import { colStyle } from "./hubble-style";
import { createHubbleTarget } from "./hubble-types";

export class SelectView extends UiView
{

    private readonly overlay:ElemOverlay;

    private readonly hubble:Hubble;

    private iv:any;

    public constructor(hubble:Hubble)
    {
        super({
            style:colStyle,
            children:[
                new Head({
                    hubble,
                    title:'Select target',
                    child:new Button({
                        type:'danger',
                        text:'Cancel',
                        onClick:()=>{
                            hubble.menu.mode={type:'main-menu'}
                        }
                    })
                }),
            ]
        })

        this.hubble=hubble;
        this.overlay=new ElemOverlay()

    }

    protected override onInit():void{

        this.overlay.setParentElement(document.body);
        document.body.addEventListener('mousemove',this.onMove);
        document.body.addEventListener('mousedown',this.prevent);
        document.body.addEventListener('mouseup',this.prevent);
        document.body.addEventListener('click',this.onClick);

        this.iv=setInterval(this.updatePosition,100);
    }

    protected override onDispose():void{
        this.overlay.dispose();
        clearInterval(this.iv);
        document.body.removeEventListener('mousemove',this.onMove);
        document.body.removeEventListener('mousedown',this.prevent);
        document.body.removeEventListener('mouseup',this.prevent);
        document.body.removeEventListener('click',this.onClick);
    }

    private readonly updatePosition=()=>{
        this.overlay.render();
    }

    private readonly onMove=(e:MouseEvent)=>{
        this.overlay.target=(e.target instanceof HTMLElement)?e.target:null;
        this.updatePosition();
    }

    private readonly prevent=(e:MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
    }

    private readonly onClick=(e:MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        if(this.overlay.target){
            this.hubble.menu.open=true;
            this.hubble.menu.mode={type:'target',target:createHubbleTarget(this.overlay.target,this.hubble.currentTarget)};
        }
    }
}
