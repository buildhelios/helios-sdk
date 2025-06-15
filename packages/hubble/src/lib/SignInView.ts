import { signInHeliosClient } from "@buildhelios/client";
import { isValidEmail } from "@iyio/common";
import { Button } from "./Button";
import { Form } from "./Form";
import { Head } from "./Head";
import { TextInput } from "./TextInput";
import { UiView } from "./UiView";
import { Hubble } from "./hubble";
import { hsComps } from "./hubble-comps";
import { colStyle } from "./hubble-style";

export class SignInView extends UiView
{

    public constructor(hubble:Hubble)
    {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let email='';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let password='';

        let emailInput:TextInput|null=null;
        let passwordInput:TextInput|null=null;

        let busy=false;

        const signIn=async ()=>{
            if(busy){
                return;
            }
            busy=true;
            this.elem.style.opacity='0.5';
            try{

                await signInHeliosClient(email,password);
                await hubble.loadTargetsAsync();
                hubble.menu.mode={type:'main-menu'}
                if(emailInput){
                    emailInput.value='';
                }
                if(passwordInput){
                    passwordInput.value='';
                }

            }finally{
                this.elem.style.opacity='1';
                busy=false;
            }
        }

        super({
            style:colStyle,
            children:[
                new Head({hubble,showClose:true}),
                hsComps.hr,

                new Form({
                    onSubmit:()=>{
                        signIn();
                    },
                    children:[
                        emailInput=new TextInput({
                            title:'Email',
                            type:'email',
                            placeholder:'Enter your email',
                            onChange:v=>this.update(()=>email=v),
                        }),

                        passwordInput=new TextInput({
                            title:'Password',
                            type:'password',
                            placeholder:'Enter your password',
                            onChange:v=>this.update(()=>password=v),
                        }),

                        new Button({
                            text:'Sign-in',
                            type:'primary',
                            beforeRender:view=>view.disabled=!(isValidEmail(email) && password)
                        })
                    ]
                })
            ]
        })
    }
}
