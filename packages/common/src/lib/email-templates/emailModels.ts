import { TemplateItem, TemplateModel } from "@buildhelios/types";
import { escapeHtml } from "@iyio/common";

export const getEmailVerificationModel=(code:string):TemplateModel=>{

    return {
        "bgColor": "#242433",
        "linkColor": "#2A85FF",
        "containers": [
            {
                "bgColor": "TRANSPARENT",
                "sections": [
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/oiUvP-aOR1eJFrs0bUx1zg",
                                        "type": "image",
                                        "linkUrl": "https://www.gardeniq.io",
                                        "maxWidth": "174px",
                                        "alignment": "center",
                                        "paddingTop": "20px",
                                        "description": "x1gLXP8VREuAGBONZwPu0A.svg",
                                        "paddingBottom": "20px"
                                    }
                                ],
                                "bgColor": "TRANSPARENT"
                            }
                        ],
                        "bgColor": "TRANSPARENT",
                        "sourceTemplateId": 45
                    },
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/PkPN68iDSia0BnisRzkxJA",
                                        "type": "image",
                                        "linkUrl": "",
                                        "description": "Email_Verification_Center.png",
                                        "borderRadius": "14px"
                                    }
                                ]
                            }
                        ],
                        "paddingLeft": "16px",
                        "paddingRight": "16px"
                    },
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "text": "Verify your email address",
                                        "type": "header",
                                        "headerLevel": 2
                                    },
                                    {
                                        "type": "text",
                                        "fontSize": "16px",
                                        "markdown": "Before you get to work, you just need to confirm that we got your email right.",
                                        "paddingTop": "24px"
                                    },
                                    {
                                        "type": "text",
                                        "fontSize": "16px",
                                        "markdown": `Your access code is **${escapeHtml(code)}**`,
                                        "paddingTop": "24px"
                                    },
                                    {
                                        "type": "text",
                                        "fontSize": "16px",
                                        "markdown": "If you did not create a GardenIQ account using this address, please contact us at [support@gardeniq.io](mailto:support@gardeniq.io).",
                                        "paddingTop": "24px"
                                    }
                                ],
                                "bgColor": "#34364C",
                                "paddingTop": "30px",
                                "paddingLeft": "28px",
                                "borderRadius": "14px",
                                "paddingRight": "28px",
                                "paddingBottom": "30px"
                            }
                        ],
                        "paddingTop": "12px",
                        "paddingLeft": "16px",
                        "borderRadius": "14px",
                        "paddingRight": "16px"
                    },
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/qVuARspmRa-z7qDWqVuXNg",
                                        "type": "image",
                                        "maxWidth": "34px",
                                        "alignment": "center",
                                        "description": "1vyD_KZ-SMa6wYMddgnGkg.svg"
                                    }
                                ],
                                "paddingTop": "10px"
                            }
                        ],
                        "paddingTop": "20px",
                        "paddingLeft": "16px",
                        "paddingRight": "16px",
                        "sourceTemplateId": 48
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
                                        "fontSize": "12px",
                                        "markdown": "[**View in Browser**]({{viewInBrowserUrl}})",
                                        "alignment": "center",
                                        "foregroundColor": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "type": "text",
                                        "fontSize": "12px",
                                        "markdown": "[**Privacy Policy**](https://www.gardeniq.io/legal)",
                                        "alignment": "center",
                                        "foregroundColor": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "type": "text",
                                        "fontSize": "12px",
                                        "markdown": "[**Terms of Use**](https://www.gardeniq.io/legal)",
                                        "alignment": "center",
                                        "foregroundColor": "#ffffff"
                                    }
                                ]
                            }
                        ],
                        "paddingTop": "24px",
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "sourceTemplateId": 48
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
                                        "fontSize": "12px",
                                        "markdown": "2024 © GardenIQ, LLC.  All rights reserved.",
                                        "alignment": "center",
                                        "paddingTop": "16px",
                                        "foregroundColor": "#b5b5b5"
                                    }
                                ]
                            }
                        ],
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "paddingBottom": "50px",
                        "sourceTemplateId": 48
                    }
                ]
            }
        ],
        "primaryColor": "#2A85FF",
        "linkTextStyle": "none",
        "foregroundColor": "#FFFFFF"
    }

}


export const getEmailForgotPasswordModel=(code:string, email:string):TemplateModel=>{

    return {

        "linkColor": "#2A85FF",
        "linkWeight": "600",
        "linkTextStyle": "none",
        "foregroundColor": "#FFFFFF",
        "bgColor": "#242433",
        "primaryColor": "#2A85FF",
        "containers": [
            {
                "bgColor": "TRANSPARENT",
                "sections": [
                    {
                        "cols": [
                            1
                        ],
                        "sourceTemplateId": 45,
                        "bgColor": "TRANSPARENT",
                        "blocks": [
                            {
                                "bgColor": "TRANSPARENT",
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/oiUvP-aOR1eJFrs0bUx1zg",
                                        "linkUrl": "https://www.gardeniq.io",
                                        "description": "x1gLXP8VREuAGBONZwPu0A.svg",
                                        "maxWidth": "174px",
                                        "paddingTop": "20px",
                                        "paddingBottom": "20px",
                                        "type": "image",
                                        "alignment": "center"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cols": [
                            1
                        ],
                        "paddingLeft": "16px",
                        "paddingRight": "16px",
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/tnC0We7QQUiHvC9G3WtD8w",
                                        "linkUrl": "",
                                        "description": "Password_Reset.png",
                                        "borderRadius": "14px",
                                        "type": "image"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cols": [
                            1
                        ],
                        "paddingTop": "12px",
                        "paddingLeft": "16px",
                        "paddingRight": "16px",
                        "borderRadius": "14px",
                        "blocks": [
                            {
                                "paddingTop": "30px",
                                "paddingBottom": "30px",
                                "paddingLeft": "28px",
                                "paddingRight": "28px",
                                "bgColor": "#34364C",
                                "borderRadius": "14px",
                                "items": [
                                    {
                                        "markdown": "Reset your password",
                                        "headerLevel": 2,
                                        "type": "header"
                                    },
                                    {
                                        "markdown": `GardenIQ has received a request to create a new password for the user account associated with **${escapeHtml(email)}**. Use the code below to verify ownership of the account.`,
                                        "paddingTop": "24px",
                                        "fontSize": "16px",
                                        "type": "text"
                                    },
                                    {
                                        "markdown": `Your verification code is **${escapeHtml(code)}**`,
                                        "paddingTop": "24px",
                                        "fontSize": "16px",
                                        "type": "text"
                                    },
                                    {
                                        "markdown": "If you did not request this password reset, please ignore this email. Contact us at [support@gardeniq.io](mailto:support@gardeniq.io) with any security concerns.",
                                        "paddingTop": "24px",
                                        "fontSize": "16px",
                                        "type": "text"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cols": [
                            1
                        ],
                        "sourceTemplateId": 48,
                        "paddingTop": "20px",
                        "paddingLeft": "16px",
                        "paddingRight": "16px",
                        "blocks": [
                            {
                                "paddingTop": "10px",
                                "items": [
                                    {
                                        "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/qVuARspmRa-z7qDWqVuXNg",
                                        "description": "1vyD_KZ-SMa6wYMddgnGkg.svg",
                                        "maxWidth": "34px",
                                        "type": "image",
                                        "alignment": "center"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cols": [
                            1
                        ],
                        "sourceTemplateId": 48,
                        "paddingTop": "24px",
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "markdown": "[**View in Browser**]({{viewInBrowserUrl}})",
                                        "foregroundColor": "#ffffff",
                                        "fontSize": "12px",
                                        "type": "text",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "markdown": "[**Privacy Policy**](https://www.gardeniq.io/legal)",
                                        "foregroundColor": "#ffffff",
                                        "fontSize": "12px",
                                        "type": "text",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "markdown": "[**Terms of Use**](https://www.gardeniq.io/legal)",
                                        "foregroundColor": "#ffffff",
                                        "fontSize": "12px",
                                        "type": "text",
                                        "alignment": "center"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "cols": [
                            1
                        ],
                        "sourceTemplateId": 48,
                        "paddingBottom": "50px",
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "markdown": "2024 © GardenIQ, LLC.  All rights reserved.",
                                        "paddingTop": "16px",
                                        "foregroundColor": "#b5b5b5",
                                        "fontSize": "12px",
                                        "type": "text",
                                        "alignment": "center"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export const getNewWorkspaceEmailModel=(registrationId:number,body:(TemplateItem|string)[]=[]):TemplateModel=>{
    return {
        "title": "Subject",
        "bgColor": "#242433",
        "linkColor": "#2A85FF",
        "containers": [
            {
                "bgColor": "TRANSPARENT",
                "sections": [
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://shared-bucksmediabucket70ce2cea-q2tbc78bhgzg.s3.amazonaws.com/EJWQ-VLLQTOFMKe7uxSwRQ",
                                        "type": "image",
                                        "linkUrl": "https://www.gardeniq.io",
                                        "maxWidth": "174px",
                                        "alignment": "center",
                                        "paddingTop": "20px",
                                        "description": "x1gLXP8VREuAGBONZwPu0A.svg",
                                        "paddingBottom": "20px"
                                    }
                                ],
                                "bgColor": "TRANSPARENT"
                            }
                        ],
                        "bgColor": "TRANSPARENT",
                        "sourceTemplateId": 45
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
                                        "markdown": "Client Signed Up",
                                        "headerLevel": 2
                                    },
                                    {
                                        "type": "text",
                                        "fontSize": "16px",
                                        "markdown": `A new account has been created with id of ${registrationId}.`,
                                        "paddingTop": "24px"
                                    },
                                    ...body.map(v=>({
                                        "type": "text",
                                        "fontSize": "16px",
                                        "markdown": (typeof v === 'string')?v:undefined,
                                        "paddingTop": "24px",
                                        ...(typeof v === 'string'?{}:(v as any))
                                    }))
                                ],
                                "bgColor": "#34364C",
                                "paddingTop": "30px",
                                "paddingLeft": "28px",
                                "borderRadius": "14px",
                                "paddingRight": "28px",
                                "paddingBottom": "30px"
                            }
                        ],
                        "paddingTop": "12px",
                        "paddingLeft": "16px",
                        "borderRadius": "14px",
                        "paddingRight": "16px"
                    },
                    {
                        "cols": [
                            1
                        ],
                        "blocks": [
                            {
                                "items": [
                                    {
                                        "url": "https://shared-bucksmediabucket70ce2cea-q2tbc78bhgzg.s3.amazonaws.com/ViULZnS_RF6-Tx4fmF3tmw",
                                        "type": "image",
                                        "maxWidth": "34px",
                                        "alignment": "center",
                                        "description": "1vyD_KZ-SMa6wYMddgnGkg.svg"
                                    }
                                ],
                                "paddingTop": "10px"
                            }
                        ],
                        "paddingTop": "20px",
                        "paddingLeft": "16px",
                        "paddingRight": "16px",
                        "sourceTemplateId": 48
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
                                        "fontSize": "12px",
                                        "markdown": "**View in Browser**",
                                        "alignment": "center"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "type": "text",
                                        "fontSize": "12px",
                                        "markdown": "[**Privacy Policy**](https://www.gardeniq.io/legal)",
                                        "alignment": "center",
                                        "foregroundColor": "#ffffff"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "type": "text",
                                        "fontSize": "12px",
                                        "markdown": "[**Terms of Use**](https://www.gardeniq.io/legal)",
                                        "alignment": "center",
                                        "foregroundColor": "#ffffff"
                                    }
                                ]
                            }
                        ],
                        "paddingTop": "24px",
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "sourceTemplateId": 48
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
                                        "fontSize": "12px",
                                        "markdown": "2024 © GardenIQ, LLC.  All rights reserved.",
                                        "alignment": "center",
                                        "paddingTop": "16px",
                                        "foregroundColor": "#b5b5b5"
                                    }
                                ]
                            }
                        ],
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "paddingBottom": "50px",
                        "sourceTemplateId": 48
                    }
                ]
            }
        ],
        "primaryColor": "#2A85FF",
        "linkTextStyle": "none",
        "foregroundColor": "#FFFFFF"
    }
}
