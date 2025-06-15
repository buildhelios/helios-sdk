import { DayOfWeekBool } from "./common-types";

export const dayOfWeekBoolHasDay=(value:DayOfWeekBool)=>{
    return (
        value.sunday ||
        value.monday ||
        value.tuesday ||
        value.wednesday ||
        value.thursday ||
        value.friday ||
        value.saturday
    )
}
