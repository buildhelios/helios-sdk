import { TemplateModel, TemplateObjType } from "@buildhelios/types";
import { Point, PointOrSides, Rect, Sides, doSidesIntersect, isPointInSides } from "@iyio/common";
import { getTemplateSelectionAtAddress, isTemplateAddress } from "./template-lib";
import { TemplateModelSelection } from "./template-types";

export const getTemplateSelectionUnder=(
    ptOrSides:PointOrSides|string,
    scope:string,
    model:TemplateModel,
    elem:Element,
    includeParents=false,
    typeFilter?:TemplateObjType[],
    verticalOnly=false,
):TemplateModelSelection[]=>{

    const sel:TemplateModelSelection[]=[];

    const isString=typeof ptOrSides === 'string';

    _getTemplateSelectionUnder(
        isString?undefined:{
            x:ptOrSides.left,
            y:ptOrSides.top,
        },
        isString?undefined:ptOrSides.bottom!==undefined && ptOrSides.right!==undefined?ptOrSides as any:undefined,
        isString?ptOrSides:undefined,
        includeParents,
        scope,
        model,
        elem,
        sel
    );

    sel.sort((a,b)=>(a.address?.length??0)-(b.address?.length??0));

    const addressMap:Record<string,string>={}

    for(let i=0;i<sel.length;i++){
        const s=sel[i];

        if(typeFilter && s?.type && !typeFilter.includes(s.type)){
            sel.splice(i,1);
            i--;
            continue;
        }

        if(!s?.address){continue}

        for(let c=i+1;c<sel.length;c++){
            const check=sel[c];
            if(!check?.address || (typeFilter && check.type && !typeFilter.includes(check.type))){
                continue
            }

            if(check.address.startsWith(s.address)){
                const address=s.address;
                addressMap[s.address]=check.address;
                for(const e in check){
                    (s as any)[e]=(check as any)[e];
                }
                (s as any).address=address;
                sel.splice(c,1);
                c--;
            }

        }

    }

    for(const s of sel){
        const mapTo=addressMap[s.address??''];
        if(mapTo){
            s.address=mapTo;
        }
    }

    if(typeof ptOrSides !== 'string'){
        const tol=verticalOnly?-1:hTol;
        for(const s of sel){
            if(s.rect){
                s.xRatio=(ptOrSides.left-s.rect.x)/s.rect.width;
                s.yRatio=(ptOrSides.top-s.rect.y)/s.rect.height;
                if(s.xRatio<=tol){
                    s.edge='left';
                }else if(s.xRatio>=(1-tol)){
                    s.edge='right';
                }else if(s.yRatio<0.5){
                    s.edge='top';
                }else{
                    s.edge='bottom';
                }
            }
        }
    }

    return sel;

}

const hTol=0.1;


const _getTemplateSelectionUnder=(
    pt:Point|undefined,
    sides:Sides|undefined,
    className:string|undefined,
    classNameStartsWith:boolean,
    scope:string,
    model:TemplateModel,
    elem:Element,
    selections:TemplateModelSelection[]
):void=>{

    for(let i=0;i<elem.classList.length;i++){
        const cl=elem.classList[i];
        if(!cl || !isTemplateAddress(cl)){
            continue;
        }

        const cr=elem.getBoundingClientRect();


        const s=(
            sides?
                doSidesIntersect(cr,sides)
            :pt?
                isPointInSides(pt,cr)
            :classNameStartsWith?
                className?.startsWith(cl)
            :
                className===cl
        );
        const sel=s?getTemplateSelectionAtAddress(cl,scope,model):undefined;

        if(sel?.type){
            const rect:Rect={
                x:cr.left,
                y:cr.top,
                width:cr.right-cr.left,
                height:cr.bottom-cr.top,
            }
            const padding:Sides={
                left:parseInt(sel.selected?.paddingLeft||'0'),
                top:parseInt(sel.selected?.paddingTop||'0'),
                right:parseInt(sel.selected?.paddingRight||'0'),
                bottom:parseInt(sel.selected?.paddingBottom||'0'),
            }
            sel.rect=rect;
            sel.padding=padding;
            (sel as any)[sel.type+'Rect']=rect;
            (sel as any)[sel.type+'Padding']=padding;
            selections.push(sel);
            break;
        }

    }

    for(let i=0;i<elem.children.length;i++){
        const child=elem.children[i];
        if(!child){continue}
        _getTemplateSelectionUnder(pt,sides,className,classNameStartsWith,scope,model,child,selections);
    }


}
