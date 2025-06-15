import { FormRecord } from "@buildhelios/types";
import { DisposeCallback, DisposeContainer } from "@iyio/common";
import { RemoteComp } from "../RemoteComp";
import { FormCtrl } from "./FormCtrl";
import { formsSubject } from "./forms-lib";

export class FormComp extends RemoteComp
{
    public static get observedAttributes(){
        return ["form-id","form-step"];
    }

    private _formRecord:FormRecord|null=null;
    public get formRecord(){return this._formRecord}

    private _formCtrl:FormCtrl|null=null;
    public get formCtrl(){return this._formCtrl}

    public constructor(){
        super({remoteType:'form'});
    }

    public override connectedCallback(){

        super.connectedCallback();

        this.disposables.addSub(formsSubject.subscribe(()=>this.updateFormId()))

        this.updateFormId();

    }

    public override attributeChangedCallback(name:string,oldValue:string,newValue:string)
    {
        super.attributeChangedCallback(name,oldValue,newValue);
        this.updateFormId();
        this.syncProps();
    }

    private clear()
    {
        const c=this.cleanUpForm;
        this.cleanUpForm=undefined;
        c?.();
    }
    private cleanUpForm:DisposeCallback|undefined;
    private updateFormId()
    {
        const id=Number(this.getAttribute('form-id'));
        if(!id){
            this.clear();
            return;
        }
        const form=formsSubject.value.find(f=>f.id===id);
        if(!form){
            this.clear();
            return;
        }

        if(form===this._formRecord){
            return;
        }

        const ctrl=new FormCtrl({
            form,
            elem:this,
            shadowRoot:this.root,
            disableRendering:this.disableTracking,
        })

        this._formRecord=form;
        this._formCtrl=ctrl;

        const dis=new DisposeContainer();
        dis.addSub(ctrl.stepSubject.subscribe(v=>{
            this.setAttribute('form-step',ctrl.step.toString());
        }))

        this.cleanUpForm=()=>{
            this._formCtrl=null;
            this._formRecord=null;
            dis.dispose();
            ctrl.dispose();
        }

        ctrl.render();
    }

    private syncProps()
    {
        const ctrl=this.formCtrl;
        if(!ctrl){
            return;
        }
        ctrl.step=Number(this.getAttribute('form-step')??'0');
    }
}
