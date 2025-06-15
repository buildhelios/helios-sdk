import { QueryCellRenderer, QueryOptions, UiActionItem } from "@iyio/common";

export interface DateTablePreset<T=any>
{
    title:string;
    columns?:string[];
    columnOrder?:string[];
    query?:QueryOptions<T>;
    data?:T[];
    getLink?:(item:T)=>string|null;
    filterMenuWrapper?:(children:any)=>any;
    cellRenderer?:QueryCellRenderer;
    accent?:number;
    titleAction?:UiActionItem;
}
