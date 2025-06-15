import { DisposeContainer } from "@iyio/common";

export interface RemoteCompOptions
{
    remoteType:string;
}

class FallbackHTMLElement
{

}

const BaseClass=globalThis.HTMLElement??FallbackHTMLElement;

export abstract class RemoteComp extends BaseClass
{

    public readonly remoteType:string;

    protected disposables=new DisposeContainer();

    public get disableTracking(){return this.getAttribute('disable-tracking')?true:false}

    private _root:ShadowRoot|null=null;
    protected get root():ShadowRoot{
        if(this._root){
            return this._root;
        }
        this._root=this.attachShadow({mode:"open"});
        return this._root;
    }

    public constructor({
        remoteType
    }:RemoteCompOptions){
        super();
        this.remoteType=remoteType;
    }

    public connectedCallback()
    {
        this.disposables.dispose();
        this.disposables=new DisposeContainer();
    }

    public disconnectedCallback()
    {
        this.disposables.dispose();
    }

    public attributeChangedCallback(name:string,oldValue:any,newValue:any)
    {
        //
    }
}
