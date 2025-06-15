import { FormRecord } from "@buildhelios/types";

export const formTemplates:Record<string,FormRecord>={
    unsubscribe:{
        id:0,
        uuid:'_',
        templates:[
            {
                "id": 0,
                "name": "Global Unsubscribe Page",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Unsubscribe from email",
                                                    "alignment": "left",
                                                    "paddingTop": "15px",
                                                    "headerLevel": 2
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "tid": "t0TMt2MJSTiU7y-LOLfnFQ",
                                                    "name": "Email",
                                                    "text": "Email address",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "email",
                                                    "marginTop": "40px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter your email address...",
                                                    "borderRadius": "8px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#EFEFEF",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#EFEFEF",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#EFEFEF",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#EFEFEF",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "ekES4exWTp-z0o5gpuDxjg",
                                                    "url": "https://gardeniq.io",
                                                    "text": "Unsubscribe",
                                                    "type": "button",
                                                    "action": "submit",
                                                    "marginTop": "40px",
                                                    "paddingTop": "16px",
                                                    "borderRadius": "10px",
                                                    "primaryColor": "#2A85FF",
                                                    "paddingBottom": "16px",
                                                    "foregroundColor": "#FFFFFF"
                                                },
                                                {
                                                    "tid": "ekES4exWTp-z0o5gpuDxjg",
                                                    "url": "https://gardeniq.app",
                                                    "text": "Update preferences",
                                                    "type": "button",
                                                    "action": "link",
                                                    "marginTop": "12px",
                                                    "paddingTop": "14px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "64px",
                                                    "primaryColor": "#FFFFFF",
                                                    "paddingBottom": "14px",
                                                    "borderTopColor": "#D6D6D6",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#D6D6D6",
                                                    "borderLeftWidth": "2px",
                                                    "foregroundColor": "#000000",
                                                    "borderRightColor": "#D6D6D6",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#D6D6D6",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            },
            {
                "id": 0,
                "name": "Success",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "You have been unsubscribed",
                                                    "alignment": "left",
                                                    "paddingTop": "16px",
                                                    "headerLevel": 2
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "text",
                                                    "markdown": "If you did not mean to do this you can resubscribe below.",
                                                    "paddingTop": "16px"
                                                },
                                                {
                                                    "tid": "vPjkre3hQMiyu_heBCxjWQ",
                                                    "url": "https://gardeniq.app",
                                                    "text": "Reactivate my subscription",
                                                    "type": "button",
                                                    "action": "link",
                                                    "marginTop": "40px",
                                                    "paddingTop": "14px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "64px",
                                                    "primaryColor": "#FFFFFF",
                                                    "paddingBottom": "14px",
                                                    "borderTopColor": "#D6D6D6",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#D6D6D6",
                                                    "borderLeftWidth": "2px",
                                                    "foregroundColor": "#000000",
                                                    "borderRightColor": "#D6D6D6",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#D6D6D6",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            }
        ],
    },
    preference:{
        id:0,
        uuid:'_',
        "templates": [
            {
                "id": 0,
                "name": "Manage preferences",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "linkColor": "#2A85FF",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Update email preferences",
                                                    "paddingTop": "15px",
                                                    "headerLevel": 3
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "text",
                                                    "markdown": "Your basic contact information is below. You can change this information to update your subscription details or unsubscribe from all emails by clicking below.",
                                                    "lineHeight": "20px",
                                                    "paddingTop": "16px"
                                                },
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "First name",
                                                    "text": "First name",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "25px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "{{firstName}}",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Last name",
                                                    "text": "Last name",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "{{lastName}}",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "eze_NI38TH-_6xn-XLKzwA",
                                                    "name": "Email",
                                                    "text": "Email address",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "email",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "{{emailAddress}}",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "GN4dxEtJQneVM1rtDcqcVw",
                                                    "name": "Phone",
                                                    "text": "Phone number",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "phone",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter your phone number",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "url": "https://gardeniq.io",
                                                    "text": "Update preferences",
                                                    "type": "button",
                                                    "marginTop": "40px",
                                                    "paddingTop": "16px",
                                                    "borderRadius": "10px",
                                                    "primaryColor": "#2A85FF",
                                                    "paddingBottom": "16px",
                                                    "foregroundColor": "#FFFFFF"
                                                },
                                                {
                                                    "url": "https://gardeniq.io",
                                                    "text": "Unsubscribe",
                                                    "type": "button",
                                                    "marginTop": "12px",
                                                    "paddingTop": "14px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "64px",
                                                    "primaryColor": "#FFFFFF",
                                                    "paddingBottom": "14px",
                                                    "borderTopColor": "#D1D1D1",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#D1D1D1",
                                                    "borderLeftWidth": "2px",
                                                    "foregroundColor": "#000000",
                                                    "borderRightColor": "#D1D1D1",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#D1D1D1",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            },
            {
                "id": 0,
                "name": "Success",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "linkColor": "#2A85FF",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Your preferences have been updated",
                                                    "paddingTop": "16px",
                                                    "headerLevel": 3
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "text",
                                                    "markdown": "Click below to review or update your preferences again.",
                                                    "paddingTop": "16px"
                                                },
                                                {
                                                    "url": "https://gardeniq.io",
                                                    "text": "Update preferences",
                                                    "type": "button",
                                                    "marginTop": "40px",
                                                    "paddingTop": "14px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "64px",
                                                    "primaryColor": "#FFFFFF",
                                                    "paddingBottom": "14px",
                                                    "borderTopColor": "#D1D1D1",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#D1D1D1",
                                                    "borderLeftWidth": "2px",
                                                    "foregroundColor": "#000000",
                                                    "borderRightColor": "#D1D1D1",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#D1D1D1",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            }
        ]
    },
    ['one-click-unsubscribe']:{
        id:0,
        uuid:'_',
        "templates": [
            {
                "id": 0,
                "name": "Unsubscribe Confirmation",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "You have been unsubscribed",
                                                    "alignment": "left",
                                                    "paddingTop": "15px",
                                                    "headerLevel": 2
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "text",
                                                    "markdown": "If you did not mean to do this you can resubscribe below.",
                                                    "paddingTop": "16px"
                                                },
                                                {
                                                    "tid": "vPjkre3hQMiyu_heBCxjWQ",
                                                    "url": "https://gardeniq.app",
                                                    "text": "Reactivate my subscription",
                                                    "type": "button",
                                                    "action": "link",
                                                    "marginTop": "40px",
                                                    "paddingTop": "14px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "64px",
                                                    "primaryColor": "#FFFFFF",
                                                    "paddingBottom": "14px",
                                                    "borderTopColor": "#D6D6D6",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#D6D6D6",
                                                    "borderLeftWidth": "2px",
                                                    "foregroundColor": "#000000",
                                                    "borderRightColor": "#D6D6D6",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#D6D6D6",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            }
        ]
    },
    privacy:{
        id:0,
        uuid:'_',
        "templates": [
            {
                "id": 0,
                "name": "Consumer Data Request",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "linkColor": "#2A85FF",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Consumer Protection",
                                                    "paddingTop": "15px",
                                                    "headerLevel": 2
                                                },
                                                {
                                                    "type": "text",
                                                    "fontSize": "14px",
                                                    "markdown": "**Data Privacy & Protections**",
                                                    "paddingTop": "5px",
                                                    "foregroundColor": "#b3b3b3"
                                                },
                                                {
                                                    "type": "hr",
                                                    "paddingTop": "30px",
                                                    "paddingBottom": "30px",
                                                    "borderTopColor": "#EFEFEF",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#EFEFEF",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#EFEFEF",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#EFEFEF",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Do Not Sell or Share My Personal Information",
                                                    "headerLevel": 4,
                                                    "paddingBottom": "16px"
                                                },
                                                {
                                                    "type": "text",
                                                    "markdown": "{{companyName}} supports your request to opt-out of the selling or sharing of your personal information to the extent required by law. Information about {{companyName}}’s collection, use, storage, sale, and sharing of personal information and your rights are provided in {{companyName}}’s {{privacyPolicy}}.",
                                                    "lineHeight": "20px",
                                                    "foregroundColor": "#6f767e"
                                                },
                                                {
                                                    "type": "text",
                                                    "markdown": "To accommodate your opt-out request, we need you to provide us with some personal information. Please fill out the form below and select “Send request.”",
                                                    "lineHeight": "20px",
                                                    "paddingTop": "20px",
                                                    "foregroundColor": "#6f767e"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "First name",
                                                    "text": "First name",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "25px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter first name",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Email",
                                                    "text": "Email address",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter email address",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ],
                                            "paddingRight": "15px"
                                        },
                                        {
                                            "items": [
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Last name",
                                                    "text": "Last name",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "25px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter last name",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ],
                                            "paddingLeft": "15px"
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Company",
                                                    "text": "Company",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "25px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter company name",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Address 1",
                                                    "text": "Street address ",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter street address",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "eze_NI38TH-_6xn-XLKzwA",
                                                    "name": "City",
                                                    "text": "City",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "email",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter city",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "GN4dxEtJQneVM1rtDcqcVw",
                                                    "name": "Zip",
                                                    "text": "Zip / postal code",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "phone",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter zip code",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ],
                                            "paddingRight": "15px"
                                        },
                                        {
                                            "items": [
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Website URL",
                                                    "text": "Website",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "25px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter website URL",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "-NUS6kH_TkuTcpEsZBp17Q",
                                                    "name": "Address 2",
                                                    "text": "Street address",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "text",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter street address",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "eze_NI38TH-_6xn-XLKzwA",
                                                    "name": "State",
                                                    "text": "State / province / region",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "email",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter state",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                },
                                                {
                                                    "tid": "GN4dxEtJQneVM1rtDcqcVw",
                                                    "name": "Country",
                                                    "text": "Country",
                                                    "type": "textInput",
                                                    "fontSize": "16px",
                                                    "inputType": "phone",
                                                    "marginTop": "16px",
                                                    "labelColor": "#A1A1A1",
                                                    "paddingTop": "12px",
                                                    "labelMargin": "5px",
                                                    "paddingLeft": "12px",
                                                    "placeholder": "Enter country",
                                                    "borderRadius": "10px",
                                                    "paddingRight": "20px",
                                                    "primaryColor": "#F4F4F4",
                                                    "labelFontSize": "12px",
                                                    "paddingBottom": "12px",
                                                    "borderTopColor": "#E3E3E3",
                                                    "borderTopWidth": "2px",
                                                    "borderLeftColor": "#E3E3E3",
                                                    "borderLeftWidth": "2px",
                                                    "borderRightColor": "#E3E3E3",
                                                    "borderRightWidth": "2px",
                                                    "borderBottomColor": "#E3E3E3",
                                                    "borderBottomWidth": "2px"
                                                }
                                            ],
                                            "paddingLeft": "15px"
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "url": "https://gardeniq.io",
                                                    "text": "Send request",
                                                    "type": "button",
                                                    "alignment": "left",
                                                    "marginTop": "50px",
                                                    "paddingTop": "16px",
                                                    "paddingLeft": "60px",
                                                    "borderRadius": "10px",
                                                    "marginBottom": "50px",
                                                    "paddingRight": "60px",
                                                    "primaryColor": "#2A85FF",
                                                    "paddingBottom": "16px",
                                                    "foregroundColor": "#FFFFFF"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px"
                                },
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Cookies and Similar Technologies",
                                                    "headerLevel": 4,
                                                    "paddingBottom": "16px"
                                                },
                                                {
                                                    "type": "text",
                                                    "markdown": "This form does not opt you out of any cookie tracking. You may use your internet browser to automatically or manually delete cookies to adjust your cookie settings. For more information about these options, please refer to the instructions in the “Help” section of your browser.",
                                                    "lineHeight": "20px",
                                                    "foregroundColor": "#6f767e"
                                                },
                                                {
                                                    "type": "text",
                                                    "markdown": "Our application and websites use cookies to optimize the experience for our users, ensure that certain parts of the website work properly, and for identity resolution. For more information, please refer to our {{privacyPolicy}}.",
                                                    "lineHeight": "20px",
                                                    "paddingTop": "20px",
                                                    "foregroundColor": "#6f767e"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px",
                                    "paddingBottom": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "linkWeight": "700",
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            },
            {
                "id": 0,
                "name": "Success",
                "formTemplateModel": {
                    "title": "Subject",
                    "bgColor": "#F4F4F4",
                    "linkColor": "#2A85FF",
                    "containers": [
                        {
                            "bgColor": "#FFFFFF",
                            "sections": [
                                {
                                    "cols": [
                                        1
                                    ],
                                    "blocks": [
                                        {
                                            "items": [
                                                {
                                                    "type": "header",
                                                    "markdown": "Your request has been submitted",
                                                    "paddingTop": "16px",
                                                    "headerLevel": 3
                                                },
                                                {
                                                    "type": "text",
                                                    "markdown": "We have received your request and will process the submission promptly within 24–48 hours.",
                                                    "paddingTop": "16px"
                                                }
                                            ]
                                        }
                                    ],
                                    "paddingTop": "48px",
                                    "paddingLeft": "64px",
                                    "paddingRight": "64px",
                                    "paddingBottom": "64px"
                                }
                            ],
                            "borderRadius": "20px"
                        }
                    ],
                    "paddingTop": "100px",
                    "primaryColor": "#000000",
                    "paddingBottom": "100px",
                    "foregroundColor": "#303030"
                }
            }
        ],
        "displayType": "popup",
        "width": "960px"
    },
}
