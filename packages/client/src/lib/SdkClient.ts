import { RegisterPushDeviceRequest } from "@buildhelios/types";
import { lookupHeliosClientAsync } from "./client";
import { HeliosClientConfig } from "./client-types";
import { getConfigAsync } from "./config";

export interface SdkClientOptions
{
    config?:HeliosClientConfig;
}

export class SdkClient
{
    public config?:HeliosClientConfig;

    public constructor({
        config
    }:SdkClientOptions={})
    {
        this.config=config;
    }

    private initPromise?:Promise<void>;
    public initAsync()
    {
        return this.initPromise??(this.initPromise=this._initAsync());
    }

    private async _initAsync(){

        if(globalThis.navigator?.serviceWorker){
            await this.initServiceWorkerAsync();
        }
    }

    public async getConfigAsync(){
        return this.config??(this.config=await getConfigAsync());
    }

    public async getAsync<T>(apiPath:string):Promise<T>{
        const u=(await this.getConfigAsync()).apiBaseUrl;
        const r=await fetch(`${u?`${u}${u.endsWith('/')?'':'/'}`:'/api/'}${apiPath}`);
        return await r.json();
    }

    public async postAsync<TInput,TReturn>(apiPath:string,input:TInput):Promise<TReturn>{
        const u=(await this.getConfigAsync()).apiBaseUrl;
        const r=await fetch(`${u?`${u}${u.endsWith('/')?'':'/'}`:'/api/'}${apiPath}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(input)
        });
        return await r.json();
    }

    private serviceWorker?:ServiceWorkerRegistration;
    private async initServiceWorkerAsync()
    {
        const config=await this.getConfigAsync();
        const sw=await globalThis.navigator?.serviceWorker?.register(config.serviceWorkerPath??'/scripts/helios-service-worker.js');
        if(!sw){
            throw new Error('Unable to register service worker')
        }
        this.serviceWorker=sw;

    }

    public async subscribeToNotificationsAsync():Promise<PushSubscription|undefined>
    {
        await this.initAsync();
        const sw=this.serviceWorker;
        if(!sw){
            return undefined;
        }

        const [publicKey,lookup]=await Promise.all([
            this.getAsync<string>('notifications/public-push-key'),
            lookupHeliosClientAsync(),
        ]);

        const sub=await sw.pushManager?.subscribe({
            userVisibleOnly:true,
            applicationServerKey:urlB64ToUint8Array(publicKey),
        });

        if(!lookup?.profile?.uuid){
            return undefined;
        }

        const r:RegisterPushDeviceRequest={
            profileUuid:lookup.profile.uuid,
            pushEndpoint:sub.endpoint,
            pushSubscription:sub,
        }
        await this.postAsync('notifications/device',r);

        return sub;

    }
}

const urlB64ToUint8Array=(base64String:string):Uint8Array=>{
  const padding="=".repeat((4-(base64String.length%4))%4);
  const base64=(base64String+padding)
    .replace(/\-/g,"+")
    .replace(/_/g,"/");

  const rawData=window.atob(base64);
  const outputArray=new Uint8Array(rawData.length);

  for (let i=0;i<rawData.length;++i) {
    outputArray[i]=rawData.charCodeAt(i);
  }
  return outputArray;
}
