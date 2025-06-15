import { SocialItem } from "@buildhelios/types";
import { base64Encode, escapeHtml } from "@iyio/common";
import { convertSvgToPngAsync, socialTypeToSvgWithOptions } from "../socials-lib";
import { getDisableSvgTemplateConversion } from "../template-lib";
import { TemplateItemRenderer } from "../template-types";

const defaultSocials:SocialItem[]=[
    {
        type:'linkedin',
        link:'https://linkedin.com',
    },
    {
        type:'facebook',
        link:'https://facebook.com',
    },
    {
        type:'x',
        link:'https://twitter.com'
    }
]

export const socialsRendererAsync:TemplateItemRenderer=async (item,address,out,style,model,ctx)=>{

    const socials=item.socials??defaultSocials;
    const color=item.foregroundColor??model.foregroundColor;

    let first=true;
    for(const s of socials){
        if(s.disabled){
            continue;
        }
        const svg=socialTypeToSvgWithOptions(s.type,{color});
        const url = ((globalThis.window || ctx.renderTarget!=='email' || getDisableSvgTemplateConversion())?
            `data:image/svg+xml;base64,${base64Encode(svg)}`
        :
            await convertSvgToPngAsync(svg,item.size??32)
        )
        out.push(`<a target="_blank" href="${escapeHtml(s.link)}"><img style="height:${item.size??32}px${first?'':';margin-left:16px'}" src="${url}" /></a>`)
        first=false;
    }


}
