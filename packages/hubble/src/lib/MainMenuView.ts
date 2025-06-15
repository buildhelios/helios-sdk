import { Head } from "./Head";
import { PanelButton } from "./PanelButton";
import { ScrollView } from "./ScrollView";
import { UiView } from "./UiView";
import { Hubble } from "./hubble";
import { hsComps } from "./hubble-comps";
import { colStyle, hs } from "./hubble-style";

export class MainMenuView extends UiView
{

    public constructor(hubble:Hubble)
    {
        super({
            style:colStyle,
            children:[
                new Head({showClose:true,hubble}),
                hsComps.hr,
                'Use Harvest to track customer activity, gather data and drive valuable analytics, insights and automations.',
                new PanelButton({
                    icon:'pointer',
                    title:'Tag Target Element',
                    text:'Track engagement with a specific page element',
                    onClick:()=>{
                        hubble.menu.mode={type:'select'};
                    },
                }),

                'Targets',
                new ScrollView({
                    minHeight:'50vh',
                    innerStyle:colStyle,
                    children:hubble.targets.length?hubble.targets.map(target=>(
                        new PanelButton({
                            icon:'tag',
                            title:target.name,
                            text:target.selector,
                            onClick:()=>{
                                hubble.currentTarget={...target};
                                hubble.menu.mode={type:'target'}
                            }
                        })
                    )):{
                        type:'span',
                        style:{
                            color:hs.mutedColor
                        },
                        children:'No targets selected'
                    }
                })
            ]
        })

        let first=true;
        this.disposables.addSub(hubble.targetsSubject.subscribe(()=>{
            if(first){
                first=false;
                return;
            }
            hubble.menu.refresh();
        }))
    }
}
