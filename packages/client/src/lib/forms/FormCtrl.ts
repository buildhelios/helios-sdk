import { defaultFormTransitionMs, getTemplateItemByIdFromTemplates, templateModelToEmailHtmlAsync } from "@buildhelios/common";
import { CommonEventTypesMap, type FormDataItem, type FormRecord, type FormSubmission, type TemplateItem } from "@buildhelios/types";
import { DisposeContainer, ReadonlySubject, createPromiseSource, joinPaths } from "@iyio/common";
import { BehaviorSubject } from "rxjs";
import { lookupHeliosClientAsync, reportEvent, setFormCloseTime, setFormOpenTime } from "../client";
import { OptionalEventRecord, defaultHeliosClientConfig } from "../client-types";
import { getConfig } from "../config";
import { setFormCtrl } from "./form-ctrl-lib";

let nextId=1;
const botFieldName='bBxc9c3knDkRlkDtQfOE';

export interface FormCtrlOptions
{
    form:FormRecord;
    elem?:HTMLElement;
    shadowRoot?:ShadowRoot;
    disableRendering?:boolean;
    disableTracking?:boolean;
}

export class FormCtrl
{
    public readonly ctrlId:string;
    public readonly form:FormRecord;

    private readonly elem?:HTMLElement;
    private readonly shadowRoot?:ShadowRoot;
    private readonly root?:HTMLElement|ShadowRoot;
    private readonly disableRendering:boolean;
    private readonly disableTracking:boolean;

    private readonly _step:BehaviorSubject<number>=new BehaviorSubject<number>(0);
    public get stepSubject():ReadonlySubject<number>{return this._step}
    public get step(){return this._step.value}
    public set step(value:number){
        if(value==this._step.value){
            return;
        }
        this._step.next(value);
        this.render();
    }

    private isBot=false;

    public constructor({
        form,
        elem,
        shadowRoot,
        disableRendering=false,
        disableTracking=false,
    }:FormCtrlOptions){
        this.ctrlId=(nextId++).toString();
        this.form=form;
        this.elem=elem;
        this.shadowRoot=shadowRoot;
        this.root=shadowRoot??elem;
        this.disableRendering=disableRendering;
        this.disableTracking=disableTracking;
        elem?.setAttribute('helios-form-ctrl-id',this.ctrlId);
        if(form.displayType!=='embed' && elem){
            elem.style.position='fixed';
            elem.style.left='0px';
            elem.style.top='0px';
            elem.style.width='100%';
            elem.style.height='100%';
            elem.style.zIndex='999999999';
        }
        this.setDefaultValues();
        setFormCtrl(this.ctrlId,this);
        if(!this.disableTracking){
            this.reportOpen();
        }

    }

    private readonly disposables=new DisposeContainer();
    private _isDisposed=false;
    public get isDisposed(){return this._isDisposed}
    public dispose()
    {
        if(this._isDisposed){
            return;
        }
        this._isDisposed=true;
        this.disposables.dispose();
        setFormCtrl(this.ctrlId,undefined);
        this.renderDisposables.dispose();
        this.elem?.remove();
    }

    private setInnerHTML(html:string){
        if(!this.root){
            return;
        }
        const f=this.form;
        html+=`<input class="helios-form-required-" type="text" name="${botFieldName}" required autocomplete="off"/>`
        if(f.displayType==='popup'){
            html=/*html*/`
                <div class="helios-form-popup">
                    <button class="helios-form-popup-bg"></button>
                    <div class="helios-form-popup-body">
                        ${html}
                        <button class="helios-form-popup-close-btn">
                            Close
                            <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.915346 1.35263C1.69639 0.571584 2.96272 0.571584 3.74377 1.35263L44.531 42.1399C45.312 42.9209 45.312 44.1872 44.531 44.9683C43.7499 45.7493 42.4836 45.7493 41.7026 44.9683L0.915346 4.18106C0.134297 3.40001 0.134297 2.13368 0.915346 1.35263Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.531 1.35264C45.3121 2.13368 45.3121 3.40001 44.531 4.18106L3.74379 44.9683C2.96274 45.7493 1.69641 45.7493 0.915359 44.9683C0.13431 44.1872 0.134311 42.9209 0.915359 42.1399L41.7026 1.35264C42.4836 0.571587 43.75 0.571587 44.531 1.35264Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `
        }
        this.root.innerHTML=/*html*/`
            <style>
                :host{
                    all:initial;
                    overflow-y:scroll;
                }
                .helios-form-required-{
                    position:fixed;
                    transform:scale(0) translate(-9999px,-9999px);
                }
                .helios-form-error-border{
                    outline:1px solid red;
                }
                .helios-form-popup{
                    display:flex;
                    flex-direction:column;
                    align-items:${f.hAlign==='start'?'flex-start':f.hAlign==='center'?'center':'flex-end'};
                    justify-content:${f.vAlign==='start'?'flex-start':f.vAlign==='center'?'center':'flex-end'};
                    background:#00000099;
                    min-height:100%;
                    position:relative;
                    opacity:${f.transition==='fade'?0:1};
                    transition:
                        transform ${f.transitionDurationMs??defaultFormTransitionMs}ms ease-in-out,
                        opacity ${f.transitionDurationMs??defaultFormTransitionMs}ms ease-in-out;
                }
                ${f.transition==='fade'?'.helios-trans-in.helios-form-popup{opacity:1}':''}
                .helios-form-popup-body{
                    display:flex;
                    flex-direction:column;
                    width:100%;
                    max-width:${f.width??'600px'};
                    margin:2rem;
                    position:relative;
                    transition:
                        transform ${f.transitionDurationMs??defaultFormTransitionMs}ms ease-in-out,
                        opacity ${f.transitionDurationMs??defaultFormTransitionMs}ms ease-in-out;
                }
                .helios-form-popup-bg{
                    position:absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;
                    background:transparent;
                    border:none;
                }
                .helios-form-popup-close-btn{
                    position:absolute;
                    right:0;
                    top:0;
                    width:24px;
                    height:24px;
                    transform:translate(50%,-50%);
                    border:1px solid #111;
                    background:#fff;
                    border-radius:50%;
                    font-size:0;
                    cursor:pointer;
                }
                .helios-form-popup-close-btn svg{
                    width:100%;
                    height:100%;
                }
                ${f.transition==='slide'?/*css*/`
                    .helios-form-popup-body{
                        transform:translate(${f.transitionAxis==='y'?
                            `0,${f.vAlign==='start'?'-100%':f.vAlign==='end'?'100%':'0'}`:
                            `${f.hAlign==='start'?'-100%':f.hAlign==='end'?'100%':'0'},0`
                        });
                    }
                    .helios-trans-in .helios-form-popup-body{
                        transform:translate(0,0);
                    }
                `:''}

            </style>
            ${html}
        `;
    }

    private querySelector(selector:string){
        return this.root?.querySelector(selector);
    }

    private querySelectorAll(selector:string){
        return this.root?.querySelectorAll(selector)??new NodeList();
    }

    private renderDisposables=new DisposeContainer();
    private renderId=0;

    public render()
    {
        this.renderId++;
        if(this.disableRendering || this._isDisposed){
            return;
        }
        const id=this.renderId;
        this.renderDisposables.dispose();
        const dis=new DisposeContainer();
        this.renderDisposables=dis;

        const bind=()=>{

            setTimeout(()=>{
                const elem=this.querySelector('.helios-form-popup');
                if(!(elem instanceof HTMLElement)){
                    return;
                }
                elem.classList.add('helios-trans-in');
            },15);

            this.querySelectorAll('[data-helios-button-id]').forEach(button=>{
                const listener=()=>{
                    if(!(button instanceof HTMLElement)){
                        return;
                    }
                    const id=button.getAttribute('data-helios-button-id');
                    if(!id){
                        return;
                    }
                    const item=getTemplateItemByIdFromTemplates(id,this.form.templates);
                    if(!item){
                        return;
                    }
                    this.executeItemAction(item);
                }
                button.addEventListener('click',listener);
                dis.addCb(()=>button.removeEventListener('click',listener));
            })

            this.querySelectorAll('[data-helios-input-id]').forEach(input=>{
                const listener=()=>{
                    if(!(input instanceof HTMLElement)){
                        return;
                    }
                    const id=input.getAttribute('data-helios-input-id');
                    if(!id){
                        return;
                    }
                    const item=getTemplateItemByIdFromTemplates(id,this.form.templates);
                    if(item?.name){
                        if(input instanceof HTMLSelectElement){
                            const value=input.value;
                            const mappedValue=item.options?.[Number(value)]?.value;
                            this.setFormData(item,mappedValue??value);
                        }else{
                            const isCheckBox=(input as HTMLInputElement)?.type==='checkbox';
                            this.setFormData(item,isCheckBox?
                                (input as HTMLInputElement).checked?
                                    (item.inputTrueValue??true)
                                :
                                    (item.inputFalseValue??false)
                            :
                                (input as HTMLInputElement).value??'')
                        }
                    }
                }
                input.addEventListener('change',listener);
                input.addEventListener('keyup',listener);
                dis.addCb(()=>{
                    input.removeEventListener('change',listener);
                    input.removeEventListener('keyup',listener);
                });
            })

            this.querySelectorAll('.helios-form-popup-bg,.helios-form-popup-close-btn').forEach(bg=>{
                const listener=()=>{
                    if(!this.disableTracking){
                        this.reportClose();
                    }
                    this.dispose();
                }
                bg.addEventListener('click',listener);
                dis.addCb(()=>bg.removeEventListener('click',listener));
            })
        }

        const model=this.form.templates[this._step.value]?.formTemplateModel;
        if(model){
            const resultRef:{result?:string}={};
            const p=templateModelToEmailHtmlAsync(model,{inline:true,enableButtonActions:true,form:this.form,resultRef});
            if(resultRef.result){
                this.setInnerHTML(resultRef.result);
                bind();
            }else{
                p.then(v=>{
                    if(id===this.renderId){
                        this.setInnerHTML(v);
                        bind();
                    }
                })
            }
        }else{
            this.setInnerHTML(`<h1>No model found for step ${this._step.value+1}</h1>`);
            bind();
        }
    }

    private readonly formData:Record<string,FormDataItem>={};

    public setFormData(item:TemplateItem,value:any){
        if(!item.name){
            return;
        }
        this.formData[item.name]={
            name:item.name,
            data:value,
            profileProp:item.profileProp
        };
    }

    public executeItemAction(item:TemplateItem){
        this.querySelectorAll('.helios-form-required-').forEach(i=>{
            if((i instanceof HTMLInputElement) && i.value){
                this.isBot=true;
            }
        })
        let requiredMissing=false;
        this.querySelectorAll('[data-helios-input-id]').forEach(input=>{
            if(!(input instanceof HTMLInputElement) && !(input instanceof HTMLSelectElement)){
                return;
            }
            if(input.required && !input.value){
                requiredMissing=true;
                input.focus();
                input.classList.add('helios-form-error-border');
                setTimeout(()=>{
                    input.classList.remove('helios-form-error-border');
                },1500);
            }
        })
        if(requiredMissing){
            return;
        }
        switch(item.action){

            case 'next':
                this.next();
                break;

            case 'previous':
                this.previous();
                break;

            case 'submit':
                this.submitAsync();
                break;

            case 'reset':
                this.reset();
                break;

            case 'custom':
                if(item.actionSource){
                    // disable esbuild eval warning
                    const ev=(globalThis as any)['eval'];
                    const fn=ev(`((ctrl)=>{${item.actionSource}})`);
                    fn(this);
                }
                break;

            case 'link':
                if(item.url){
                    const open=()=>globalThis.window?.open(item.url,'_blank');
                    if(this.disableTracking){
                        open();
                    }else{
                        this.reportClickAsync().then(open);
                    }

                }
                break;

            case 'exit':
                this.dispose();
                break;

        }
    }

    public async submitAsync()
    {

        const config=getConfig()??defaultHeliosClientConfig;
        const baseUrl=config.apiBaseUrl;
        if(!baseUrl){
            return;
        }

        const items:FormDataItem[]=[]
        for(const e in this.formData){
            const item=this.formData[e];
            if(item){
                items.push({...item});
            }
        }

        try{

            const client=await lookupHeliosClientAsync();

            const sub:FormSubmission={
                id:0,
                uuid:'',
                profileUuid:client?.profile?.uuid,
                formId:this.form.id,
                created:Date.now(),
                step:this.step,
                data:items
            }

            if(config.disableFormSubmit){
                console.log('Forms submission to endpoint disabled',sub);
            }else if(!this.isBot){
                await fetch(joinPaths(baseUrl,'form-submission'),{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(sub)
                });
            }

            if(config.closeWindowOnFormSubmit){
                try{
                    globalThis.document.body.innerHTML=`Form submitted. You may close this window now`;
                    globalThis.window.close();
                }catch{}
            }
        }catch(ex){
            //todo - store form for submission later
            console.error('Form submission failed',ex);
        }

        const next=this.form.templates[this._step.value+1]?.formTemplateModel;
        if(next){
            this.next();
        }else{
            this.dispose();
        }
    }

    public reset()
    {
        for(const e in this.formData){
            delete this.formData[e];
        }

        this.querySelectorAll('[data-helios-input-id]').forEach(input=>{
            if(input instanceof HTMLInputElement){
                input.value=''
            }
        });

        this.setDefaultValues();

    }

    private setDefaultValues()
    {
        for(const t of this.form.templates){
            const model=t.formTemplateModel;
            if(!model?.containers){
                continue;
            }
            for(const c of model.containers){
                if(!c.sections){
                    continue;
                }
                for(const s of c.sections){
                    if(!s.blocks){
                        continue;
                    }
                    for(const b of s.blocks){
                        if(!b.items){
                            continue;
                        }
                        for(const i of b.items){
                            if(i.defaultValue){
                                this.setFormData(i,i.defaultValue);
                            }
                        }
                    }
                }
            }
        }
         const model=this.form.templates[this._step.value]?.formTemplateModel;
    }

    public next()
    {
        if(this.step<=this.form.templates.length-1){
            this.step++;
        }
    }

    public previous()
    {
        if(this.step>0){
            this.step--;
        }
    }

    public reportOpen(){
        setFormOpenTime(this.form.uuid);
        reportEvent({
            type:CommonEventTypesMap.formOpen,
            formId:this.form.id
        })
    }

    public reportClose(){
        setFormCloseTime(this.form.uuid);
        reportEvent({
            type:CommonEventTypesMap.formClose,
            formId:this.form.id
        })
    }

    public async reportClickAsync(){
        try{
            const p=createPromiseSource<OptionalEventRecord>();
            reportEvent({
                type:CommonEventTypesMap.click,
                formId:this.form.id,
            },p);
            await p.promise;
        }catch(ex){
            console.error('Report click failed',ex);
        }
    }
}



