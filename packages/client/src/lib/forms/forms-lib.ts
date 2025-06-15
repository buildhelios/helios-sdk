import { FormRecord } from "@buildhelios/types";
import { BehaviorSubject } from "rxjs";

export const formsSubject=new BehaviorSubject<FormRecord[]>([]);

export const defaultShowFormAgainDays=1;
