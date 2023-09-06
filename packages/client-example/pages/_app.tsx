import { initHeliosClient } from '@buildhelios/client';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Links } from '../components/Links';

export default function App({Component,pageProps}:AppProps){

    useEffect(()=>{
        initHeliosClient({
            targets:[
                {selector:'*'}
            ],
            //listenToMoveEvents:true,
            listenToKeyboardEvents:true,
            logEvents:true,
            minifyEvents:true,
        });
    },[]);

    return (
        <>
            <div>
                <Links/>
                <Component {...pageProps} />
            </div>
        </>
    )
}
