/* <ALLOW_AUTO_DELETE DEPENDENCIES="Product" /> */
// this file was autogenerated by @iyio/protogen - https://github.com/iyioio/common/packages/protogen
import { EventRecord } from './EventRecord';

export interface Product
{
    id:number;
    altId?:string;
    name:string;
    price:number;
    events?:EventRecord[];
}
