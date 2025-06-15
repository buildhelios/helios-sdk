import { aryRemoveItem, asArray, DisposeContainer, HashMap } from "@iyio/common";
import type { CSSProperties } from 'react';
import { nodeListToAry } from "./content-utils";
import { hs } from "./hubble-style";

export type UiViewChild=string|number|null|undefined|boolean|UiView|UiViewProps|(()=>string|number|UiView);
export type UiViewChildren=UiViewChild|UiViewChild[];

const parserElem=document.createElement('div');

const defaultStyle:CSSProperties={
    display:'flex',
    flexDirection:'row',
    padding:'0px',
    margin:'0px',
    color:hs.fontColor,
    fontSize:hs.mdFontSize,
    borderRadius:'0px',
    boxSizing:'border-box',
    background:'none',
    border:'none',
    boxShadow:'none',
    filter:'none',
    transform:'none',
    transition:'none',
    width:'auto',
    height:'auto',
    maxHeight:'auto',
    minHeight:'auto',
    maxWidth:'auto',
    minWidth:'auto',
    flexBasis:'auto',
    left:'auto',
    right:'auto',
    top:'auto',
    bottom:'auto',
    zIndex:'auto',
    gap:'0px',
    lineHeight:'1.2em',
    fontWeight:'500',
    fontFamily:"'Inter', sans-serif",
    textAlign:'left',
    visibility:'visible',

}

export interface UiViewEventProps<V extends UiView=UiView>
{

    init?:(view:V)=>void;
    beforeRender?:(view:V)=>void;
    afterRender?:(view:V)=>void;
}

export interface UiViewProps extends UiViewEventProps
{
    type?:string;
    className?:string;
    style?:CSSProperties;
    hoverStyle?:CSSProperties;
    children?:UiViewChildren;
    listeners?:HashMap<(e:Event)=>void>;
    innerHTML?:string;
}

export class UiView<T extends HTMLElement=HTMLElement>
{

    public readonly elem:T;

    private readonly childrenProp?:UiViewChild|UiViewChild[];

    private readonly initProp?:(view:UiView)=>void;
    private readonly beforeRenderProp?:(view:UiView)=>void;
    private readonly afterRenderProp?:(view:UiView)=>void;

    public constructor({
        type='div',
        style,
        hoverStyle,
        className,
        children,
        listeners,
        innerHTML,
        init,
        beforeRender,
        afterRender,
    }:UiViewProps)
    {
        this.elem=document.createElement(type) as T;
        if(className){
            this.elem.classList.add(className);
        }
        if(innerHTML){
            this.elem.innerHTML=innerHTML;
        }
        this.childrenProp=children;
        this.initProp=init;
        this.beforeRenderProp=beforeRender;
        this.afterRenderProp=afterRender;
        for(const e in defaultStyle){
            (this.elem.style as any)[e]=(defaultStyle as any)[e];
        }
        if(style){
            for(const e in style){
                const v=(style as any)[e];
                if(v===undefined){
                    continue;
                }
                (this.elem.style as any)[e]=v;
            }
        }
        if(hoverStyle){
            let beforeHover:any=null;
            this.elem.addEventListener('mouseenter',()=>{
                if(beforeHover){
                    return;
                }
                beforeHover={};
                for(const e in hoverStyle){
                    const v=(hoverStyle as any)[e];
                    if(v===undefined){
                        continue;
                    }
                    beforeHover[e]=(this.elem.style as any)[e];
                    (this.elem.style as any)[e]=v;
                }
            })
            this.elem.addEventListener('mouseleave',()=>{
                if(!beforeHover){
                    return;
                }
                for(const e in beforeHover){
                    (this.elem.style as any)[e]=beforeHover[e];
                }
                beforeHover=null;
            })
        }

        if(listeners){
            for(const e in listeners){
                const listener=listeners[e];
                if(!listener){
                    continue;
                }
                this.elem.addEventListener(e,listener);
            }
        }

    }

    private inited=false;
    private initing=false;

    protected onInit()
    {
        // do nothing
    }

    protected onDispose()
    {
        // do nothing
    }

    protected onRender()
    {
        // do nothing
    }

    protected onAfterRender()
    {
        // do nothing
    }

    private _render()
    {
        this.beforeRenderProp?.(this);
        this.onRender();
        for(const child of this.children){
            child._render()
        }

    }

    private _afterRender()
    {
        for(const child of this.children){
            child._afterRender()
        }
        this.onAfterRender();
        this.afterRenderProp?.(this);

    }

    public render()
    {
        if(this._isDisposed || !this.inited || (this.parent && !this.parent.inited)){
            return;
        }
        this._render();
        this._afterRender();
    }

    public update(action:(view:UiView<T>)=>any|Promise<any>){
        const r=action(this);
        if(r && (typeof r.then === 'function')){
            r.then(()=>this.render())
        }else{
            this.render();
        }
    }

    private _init(parent:UiView|null)
    {
        if(this.inited || this.initing || this._isDisposed){
            return;
        }
        this.initing=true;
        this.parent=parent;
        if(this.childrenProp!==undefined){
            const ary=asArray(this.childrenProp);
            if(!ary){
                return;
            }
            for(const c of ary){
                if(c===null || c===undefined){
                    continue;
                }
                const child=typeof c === 'function'?c():c;
                if(child instanceof UiView){
                    this.addChild(child);
                }else if(typeof child === 'object'){
                    this.addChild(new UiView(child));
                }else if(typeof child === 'string'){
                    if(child.trim().startsWith('<')){
                        parserElem.innerHTML=child;
                        const children=nodeListToAry(parserElem.children);
                        for(const c of children){
                            c.remove();
                            this.elem.append(c);
                        }
                        parserElem.innerHTML='';
                    }else{
                        this.elem.append(child);
                    }
                }else{
                    this.elem.append(child.toString())
                }
            }
        }
        this.inited=true;
        this.onInit();
        this.initProp?.(this);

        this.render();

    }

    protected disposables=new DisposeContainer();
    private _isDisposed=false;
    public get isDisposed(){return this._isDisposed}
    public dispose()
    {
        if(this._isDisposed){
            return;
        }
        this._isDisposed=true;

        this.disposables.dispose();

        for(const child of this.children){
            child.dispose();
        }

        if(this.parent){
            aryRemoveItem(this.parent.children,this as any);
            this.parent=null;
        }
        this.elem.remove();

        this.onDispose();
    }

    private readonly children:UiView[]=[];

    private parent:UiView|null=null;

    public addChild(child:UiView){
        if(this._isDisposed){
            return;
        }
        if(this.children.includes(child)){
            return;
        }
        if(child.inited){
            throw new Error('UiView already inited')
        }
        if(child.parent){
            throw new Error('UiView already has a parent')
        }
        if(child.elem.parentElement){
            throw new Error('UiView already has a parentElement')
        }
        this.children.push(child);
        this.elem.append(child.elem);
        child._init(this as any);
    }

    public setParentElement(parent:HTMLElement){
        if(this._isDisposed){
            return;
        }
        if(this.inited){
            throw new Error('UiView already inited')
        }
        if(this.parent){
            throw new Error('UiView already has a parent')
        }
        if(this.elem.parentElement){
            throw new Error('UiView already has a parentElement')
        }

        parent.append(this.elem);
        this._init(null);
    }

    public querySelector(query:string){
        return this.elem.querySelector(query);
    }
    public querySelectorAll(query:string){
        return nodeListToAry(this.elem.querySelectorAll(query));
    }
}
