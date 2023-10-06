import { loadHubbleTargets, storeKey } from "./hubble-lib";
import { insertHubbleStyleSheet } from "./hubble-style-sheet";
import { HubbleTarget } from "./hubble-types";
import { HubbleMenu } from "./HubbleMenu";


export class Hubble{


    public readonly menu:HubbleMenu;

    public currentTarget:HubbleTarget|null=null;

    public targets:HubbleTarget[]=[];


    public constructor()
    {
        this.loadTargets();

        this.menu=new HubbleMenu(this);
    }

    public init()
    {

        insertHubbleStyleSheet();
        window.addEventListener('keyup',this.onKey);

        if(location.search?.includes('__hubble_action__=open')){
            this.menu.open=true;
        }
    }

    public dispose()
    {
        this.menu.dispose();
        window.removeEventListener('keyup',this.onKey);
    }

    private readonly onKey=(e:KeyboardEvent)=>{
        if(e.ctrlKey && e.shiftKey && e.altKey && e.key==='1'){
            e.preventDefault();
            e.stopPropagation();

            this.menu.open=!this.menu.open;
        }
    }

    public saveTarget(target:HubbleTarget)
    {
        const matchIndex=this.targets.findIndex(t=>t.id===target.id);
        if(matchIndex===-1){
            this.targets.push(target);
        }else{
            this.targets[matchIndex]=target;
        }

        localStorage.setItem(storeKey,JSON.stringify(this.targets))
    }

    public deleteTarget(id:string){
        const matchIndex=this.targets.findIndex(t=>t.id===id);
        if(matchIndex===-1){
            return;
        }

        this.targets.splice(matchIndex,1);

        localStorage.setItem(storeKey,JSON.stringify(this.targets))
    }

    public loadTargets()
    {
        this.targets=loadHubbleTargets();
    }

}
