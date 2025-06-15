import { singleColumnEmailTemplate } from "./singleColumnEmailTemplate";

// todo - move templates to database
export const emailTemplateRegister:Record<string,string>={
    singleColumn:singleColumnEmailTemplate
}
