import { UiActionItem } from "@iyio/common";
import { IconType } from "./icon-types";

export type WithoutId<T>=Omit<T,'id'>;

export type ActionItem=UiActionItem<IconType>;
