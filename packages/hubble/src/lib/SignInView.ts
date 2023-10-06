import { isValidEmail } from "@iyio/common";
import { Button } from "./Button";
import { Form } from "./Form";
import { Head } from "./Head";
import { Hubble } from "./Hubble";
import { TextInput } from "./TextInput";
import { UiView } from "./UiView";
import { hsComps } from "./hubble-comps";
import { colStyle } from "./hubble-style";

const tmpPassword='impact123'

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

        super({
            style:colStyle,
            children:[
                new Head({hubble,showClose:true}),
                hsComps.hr,

                new Form({
                    onSubmit:()=>{
                        if(password===tmpPassword){
                            hubble.menu.mode={type:'main-menu'}
                        }
                        if(emailInput){
                            emailInput.value='';
                        }
                        if(passwordInput){
                            passwordInput.value='';
                        }
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
