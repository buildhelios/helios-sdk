import { shouldShowForm } from "@buildhelios/common";
import { FormRecord } from "@buildhelios/types";
import { joinPaths } from "@iyio/common";
import { getFormOpenTime } from "../client";
import { defaultHeliosClientConfig } from "../client-types";
import { getConfig } from "../config";
import { FormComp } from "./FormComp";
import { formsSubject } from "./forms-lib";

interface PageState
{
    url:string;
    startTime:number;
    scrollY:number;
}


export class FormMgr
{

    private forms:FormRecord[]=[];

    private pageState:PageState|null=null;

    private stateIv:any;

    public async initAsync()
    {

        await this.loadAsync();

        if(this.stateIv){
            clearInterval(this.stateIv);
        }
        this.stateIv=setInterval(()=>{
            this.updatePageStateUsingRules();
        },1000);
    }

    private _isDisposed=false;
    public get isDisposed(){return this._isDisposed}
    public dispose()
    {
        if(this._isDisposed){
            return;
        }
        this._isDisposed=true;
        if(this.stateIv){
            clearInterval(this.stateIv);
            this.stateIv=undefined;
        }
    }

    public async loadAsync()
    {
        const config=getConfig()??defaultHeliosClientConfig;
        if(config.forms.length){
            this.forms=config.forms;
            return;
        }
        const baseUrl=config.apiBaseUrl;
        if(!baseUrl){
            return;
        }
        const r=await fetch(joinPaths(baseUrl,'forms'));
        const ary:FormRecord[]=await r.json();
        this.forms=ary;
        formsSubject.next(ary);

        this.updatePageStateUsingRules();
    }

    private updatePageStateUsingRules()
    {
        const config=getConfig()??defaultHeliosClientConfig;
        if(config.disableFormRules){
            return;
        }
        let url=globalThis.location?.href;
        if(url===undefined){
            return;
        }

        const hi=url.indexOf('#');
        if(hi!==-1){
            url=url.substring(0,hi);
        }

        const prev=this.pageState;
        const now=Date.now();
        const isNew=prev?.url!==url
        const state:PageState={
            url,
            startTime:prev && !isNew?prev.startTime:now,
            scrollY:globalThis.document?.body.scrollTop??0
        }
        this.pageState=state;

        const forms=this.forms;
        for(const form of forms){
            if(shouldShowForm(form,{
                url,
                timeAtPathMs:now-state.startTime,
                pageOpening:isNew,
                scrollY:state.scrollY,
                now,
                isMobile:(globalThis.window?.innerWidth??1024)<500,
                lastCloseTime:getFormOpenTime(form.uuid)
            })){
                const elem=new FormComp();
                elem.setAttribute('form-id',form.id.toString());
                if(form.displayType==='embed'){
                    const target=form.insertTarget?globalThis.document?.querySelector(form.insertTarget):null;
                    if(target){
                        target.append(elem);
                    }else{
                        document.body.append(elem);
                    }
                }else{
                    document.body.append(elem);
                }
            }
        }
    }
}
