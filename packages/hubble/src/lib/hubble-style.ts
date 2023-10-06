import { CSSProperties } from "react";

const lightGray='#BABABB';
export const hs={
    fontColor:'#fcfcfc',
    lightGray,
    mutedColor:lightGray,
    borderColor:lightGray,
    inputBorderColor:'#33383f',
    iconColor:lightGray,
    iconSize:'20px',
    titleMarkerColor:'#ffbc99',
    primaryColor:'#4085F8',
    panelColor:'#1A1D1F',
    dangerColor:'#EF755C',
    inputColor:'#282B30',
    borderRadius:'12px',
    lgBorderRadius:'16px',
    smBorderRadius:'4px',

    lgFontSize:'20px',
    mdFontSize:'15px',
    smFontSize:'12px',
    xsFontSize:'10px',

    spaceLg:'24px',
    spaceMd:'16px',
    spaceSm:'4px',

} as const;

export const colStyle:CSSProperties={
    display:'flex',
    flexDirection:'column',
    gap:hs.spaceMd,
}

export const h1Style:CSSProperties={
    fontSize:hs.lgFontSize,
    fontWeight:'600'
}
