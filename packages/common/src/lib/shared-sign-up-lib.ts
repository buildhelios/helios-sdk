export type SharedSignUpKeys='userProfile'|'account';

const sharedKey='helios.sharedSignup';

export const saveSharedSignUpData=(key:SharedSignUpKeys,data:any)=>{

    let signUpData:Record<string,any>;

    const json=globalThis.localStorage?.getItem(sharedKey);
    if(json){
        try{
            signUpData=JSON.parse(json);
        }catch{
            signUpData={}
        }
    }else{
        signUpData={};
    }

    signUpData[key]=data;

    globalThis.localStorage?.setItem(sharedKey,JSON.stringify(signUpData));

    return signUpData;
}

export const getSharedSignUpData=(key:SharedSignUpKeys)=>{

    let signUpData:Record<string,any>;
    
    const json=globalThis.localStorage?.getItem(sharedKey);
    if (json) {
        try{
            signUpData=JSON.parse(json);
        }catch{
            signUpData={};
        }
    }else{
        signUpData={};
    }

    return signUpData[key];
}
