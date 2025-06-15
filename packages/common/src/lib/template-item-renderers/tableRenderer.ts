import { escapeHtml, formatMarkdown } from "@iyio/common";
import { TemplateItemRenderer } from "../template-types";

export const tableRenderer:TemplateItemRenderer=(item,address,out)=>{
    out.push(`<table style="${
        item.alignment?'':';width:100%'
    };margin:${
        item.alignment==='left'?'0':
        item.alignment==='right'?'0 0 0 auto':
        item.alignment==='center'?'0 auto':
        '0'
    }"><tbody>`);
    const cols=item.cols??1;
    const rows=item.rows??1;

    for(let y=0;y<rows;y++){
        out.push('<tr>');
        for(let x=0;x<cols;x++){
            const cell=item.cells?.find(c=>c.col===x && c.row===y);
            const bgColor=item.altBg?(y%2)?item.altBgColor:item.bgColor:item.bgColor;
            out.push(`<td style="${
                item.paddingTop?`padding-top:${item.paddingTop};`:''
                }${item.paddingBottom?`padding-bottom:${item.paddingBottom};`:''
                }${item.paddingLeft?`padding-left:${item.paddingLeft};`:''
                }${item.paddingRight?`padding-right:${item.paddingRight};`:''
                }${bgColor?`background-color:${bgColor};`:''
                }${item.borderLeftWidth?`border-left-width:${item.borderLeftWidth};`:''
                }${item.borderLeftColor?`border-left-color:${item.borderLeftColor};`:''
                }${item.borderLeftStyle || item.borderLeftWidth?`border-left-style:${item.borderLeftStyle??'solid'};`:''
                }${item.borderRightWidth?`border-right-width:${item.borderRightWidth};`:''
                }${item.borderRightColor?`border-right-color:${item.borderRightColor};`:''
                }${item.borderRightStyle || item.borderRightWidth?`border-right-style:${item.borderRightStyle??'solid'};`:''
                }${item.borderTopWidth?`border-top-width:${item.borderTopWidth};`:''
                }${item.borderTopColor?`border-top-color:${item.borderTopColor};`:''
                }${item.borderTopStyle || item.borderTopWidth?`border-top-style:${item.borderTopStyle??'solid'};`:''
                }${item.borderBottomWidth?`border-bottom-width:${item.borderBottomWidth};`:''
                }${item.borderBottomColor?`border-bottom-color:${item.borderBottomColor};`:''
                }${item.borderBottomStyle || item.borderBottomWidth?`border-bottom-style:${item.borderBottomStyle??'solid'};`:''
                }${x && item.innerVBorderWidth?`border-left-width:${item.innerVBorderWidth};`:''
                }${x && item.innerVBorderColor?`border-left-color:${item.innerVBorderColor};`:''
                }${x && (item.innerVBorderStyle || item.innerVBorderWidth)?`border-left-style:${item.innerVBorderStyle??'solid'};`:''
                }${y && item.innerHBorderWidth?`border-top-width:${item.innerHBorderWidth};`:''
                }${y && item.innerHBorderColor?`border-top-color:${item.innerHBorderColor};`:''
                }${y && (item.innerHBorderStyle || item.innerHBorderWidth)?`border-top-style:${item.innerHBorderStyle??'solid'};`:''
            }">`);
            if(cell?.markdown){
                out.push(formatMarkdown(cell.markdown,'html'));
            }else if(cell?.text){
                out.push(escapeHtml(cell.text));
            }else{
                out.push('&nbsp;');
            }
            out.push(`</td>`);
        }
        out.push('</tr>');
    }
    out.push('</tbody></table>');
}
