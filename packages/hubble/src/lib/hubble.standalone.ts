import { hubbleAutoOpenGlobalFlag } from '@buildhelios/client';
import { Hubble } from "./Hubble";

const hubble=new Hubble();
hubble.init();
console.info('Init Hubble',hubble);

if((globalThis.window as any)?.[hubbleAutoOpenGlobalFlag]===hubbleAutoOpenGlobalFlag){
    setTimeout(()=>{
        hubble.menu.open=true;
    },1000);
}
