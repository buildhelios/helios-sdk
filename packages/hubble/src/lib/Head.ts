import { UiView, UiViewChild } from "./UiView";
import { Hubble } from "./hubble";
import { icons } from "./hubble-icons";
import { h1Style, hs } from "./hubble-style";
import { HubblePos } from "./hubble-types";

interface HeadProps
{
    showClose?:boolean;
    title?:string;
    child?:UiViewChild;
    hubble:Hubble;
}

export class Head extends UiView
{

    private readonly hubble:Hubble;

    public constructor({
        title='Harvest',
        child,
        showClose,
        hubble,
    }:HeadProps){
        super({

            type:'div',
                style:{
                    flexDirection:'row',
                    gap:hs.spaceMd,
                    alignItems:'center',
                },
                listeners:{
                    mousedown:e=>this.startDrag(e as MouseEvent)
                },
                children:[
                    {
                        type:'div',
                        style:{
                            width:'16px',
                            height:'32px',
                            backgroundColor:hs.titleMarkerColor,
                            borderRadius:hs.smBorderRadius,
                        }
                    },
                    {
                        type:'h1',
                        style:h1Style,
                        children:title,
                        className:'hb-title'
                    },
                    {
                        style:{
                            flex:'1',
                            justifyContent:'flex-end',
                            alignItems:'center',
                        },
                        children:[
                            child,
                            showClose?{
                                type:'button',
                                children:icons.x(),
                                listeners:{
                                    click:()=>{
                                        hubble.menu.open=false;
                                    }
                                }
                            }:null
                        ],
                    }

                ]
        })
        this.hubble=hubble;
    }

    protected override onInit(): void {
        window.addEventListener('mousemove',this.onMouseMove);
        window.addEventListener('mouseup',this.onMouseUp);
    }

    protected override onDispose(): void {
        window.removeEventListener('mousemove',this.onMouseMove);
        window.removeEventListener('mouseup',this.onMouseUp);
    }

    private isDragging=false;
    private dragStart:HubblePos={x:0,y:0}
    private dragOffset:HubblePos={x:0,y:0}
    public startDrag(e:MouseEvent)
    {
        this.isDragging=true;
        this.dragStart={x:e.clientX,y:e.clientY}
        this.dragOffset={...this.hubble.menu.position}
    }

    private setMenuPos(e:MouseEvent){
        this.hubble.menu.position={
            x:this.dragOffset.x+e.clientX-this.dragStart.x,
            y:this.dragOffset.y+e.clientY-this.dragStart.y,
        }
    }

    private readonly onMouseMove=(e:MouseEvent)=>{
        if(!this.isDragging){
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.setMenuPos(e);
    }

    private readonly onMouseUp=(e:MouseEvent)=>{
        if(!this.isDragging){
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.setMenuPos(e);
        this.isDragging=false;

    }
}
