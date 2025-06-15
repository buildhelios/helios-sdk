import { MessageTemplate } from "@buildhelios/types";
import { deepClone } from "@iyio/common";
import { FormTemplate } from "./template-types";
import { templateMessage1Col } from "./templates";

export const createDefaultFormTemplate=():FormTemplate=>{
    return {
        templates:[
            createDefaultFormMessageTemplate()
        ]
    }
}

export const createDefaultFormMessageTemplate=():MessageTemplate=>{
    return {
        id:0,
        formTemplateModel:deepClone(templateMessage1Col)
    }
}
