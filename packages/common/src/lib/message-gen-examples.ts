import { TemplateModel, TemplateSection } from "@buildhelios/types";

export interface MessageGenExample
{
    name:string;
    description:string;
    model:TemplateModel;
}

export const messageGenExamples:MessageGenExample[]=[
    {
        name:'Plan Limits Reached',
        description:'A user receives this message when the have reached the limit of their plan',
        model:{
            "title": "Subject",
            "bgColor": "#242433",
            "linkColor": "#2A85FF",
            "containers": [
                {
                    "sections": [
                        {
                            "cols": [
                                1
                            ],
                            "blocks": [
                                {
                                    "items": [
                                        {
                                            "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/1vyD_KZ-SMa6wYMddgnGkg",
                                            "type": "image",
                                            "linkUrl": "https://www.gardeniq.io",
                                            "maxWidth": "174px",
                                            "alignment": "center",
                                            "paddingTop": "30px",
                                            "description": "giq_leaf.svg",
                                            "paddingBottom": "10px"
                                        }
                                    ]
                                }
                            ],
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
                                            "markdown": "Plan limits reached!",
                                            "alignment": "center",
                                            "paddingTop": "16px",
                                            "headerLevel": 2,
                                            "paddingBottom": "30px"
                                        }
                                    ]
                                }
                            ],
                            "paddingLeft": "30px",
                            "paddingRight": "30px"
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
                                            "fontSize": "16px",
                                            "markdown": "You've reached **95% of your plan limit** for customer profiles. Your account has auto-upgrade enabled. Your plan will be automatically upgraded once you exceed your plan limit.",
                                            "lineHeight": "22px"
                                        },
                                        {
                                            "type": "hr",
                                            "paddingTop": "20px",
                                            "paddingBottom": "20px",
                                            "borderTopColor": "#34364C",
                                            "borderTopWidth": "2px",
                                            "borderLeftColor": "#34364C",
                                            "borderLeftWidth": "2px",
                                            "borderRightColor": "#34364C",
                                            "borderRightWidth": "2px",
                                            "borderBottomColor": "#34364C",
                                            "borderBottomWidth": "2px"
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "16px",
                                            "markdown": "**Your current plan: $35/mo**",
                                            "paddingBottom": "4px"
                                        },
                                        {
                                            "type": "text",
                                            "markdown": "2,375 of 2,500 customer profiles used",
                                            "foregroundColor": "#ff6a55"
                                        },
                                        {
                                            "type": "hr",
                                            "paddingTop": "20px",
                                            "paddingBottom": "20px",
                                            "borderTopColor": "#34364C",
                                            "borderTopWidth": "2px",
                                            "borderLeftColor": "#34364C",
                                            "borderLeftWidth": "2px",
                                            "borderRightColor": "#34364C",
                                            "borderRightWidth": "2px",
                                            "borderBottomColor": "#34364C",
                                            "borderBottomWidth": "2px"
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "16px",
                                            "markdown": "**Auto-upgrade: $65/mo**",
                                            "paddingBottom": "4px",
                                            "foregroundColor": "#07be68"
                                        },
                                        {
                                            "type": "text",
                                            "markdown": "2,501 – 5,000 customer profiles\n\nUp to 50,000 emails & notifications per month",
                                            "lineHeight": "22px",
                                            "foregroundColor": "#c0c0ce"
                                        }
                                    ],
                                    "paddingTop": "30px",
                                    "paddingLeft": "30px",
                                    "borderRadius": "16px",
                                    "paddingRight": "30px",
                                    "paddingBottom": "30px",
                                    "borderTopColor": "#34364C",
                                    "borderTopWidth": "2px",
                                    "borderLeftColor": "#34364C",
                                    "borderLeftWidth": "2px",
                                    "borderRightColor": "#34364C",
                                    "borderRightWidth": "2px",
                                    "borderBottomColor": "#34364C",
                                    "borderBottomWidth": "2px"
                                }
                            ],
                            "paddingLeft": "20px",
                            "borderRadius": "16px",
                            "paddingRight": "20px",
                            "borderTopColor": "#2E2E2E",
                            "borderLeftColor": "#2E2E2E",
                            "borderRightColor": "#2E2E2E",
                            "borderBottomColor": "#2E2E2E"
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
                                            "fontSize": "14px",
                                            "markdown": "You can disable auto-upgrade in [workspace settings](/billing). When auto-upgrade is disabled, GardenIQ will continue to create and store customer profiles once the active profile limit is reached. New profiles beyond your active limit will be suppressed. Suppressed profiles are excluded from messaging automations. [Learn more about plan limits](www.gardeniq.io/knowledge-base/plan-limits).",
                                            "lineHeight": "18px",
                                            "paddingBottom": "20px"
                                        },
                                        {
                                            "tid": "lB7qBkPmSqKsO5ZueVIkug",
                                            "url": "https://gardeniq.io",
                                            "text": "Manage plan",
                                            "type": "button",
                                            "action": "link",
                                            "marginTop": "16px",
                                            "borderRadius": "12px",
                                            "primaryColor": "TRANSPARENT",
                                            "borderTopColor": "#EBEBEB",
                                            "borderTopWidth": "2px",
                                            "borderLeftColor": "#EBEBEB",
                                            "borderLeftWidth": "2px",
                                            "foregroundColor": "WHITE",
                                            "borderRightColor": "#EBEBEB",
                                            "borderRightWidth": "2px",
                                            "borderBottomColor": "#EBEBEB",
                                            "borderBottomWidth": "2px"
                                        }
                                    ]
                                }
                            ],
                            "paddingTop": "30px",
                            "paddingLeft": "50px",
                            "paddingRight": "50px"
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
                                            "fontSize": "14px",
                                            "markdown": "**Can't see the button?** Paste this link into your browser:\n[https://www.gardeniq.app/c/a19a1641-24da-44cd-8f67-815a087a0ee6?](https://www.gardeniq.io/c/a19a1641-24da-44cd-8f67-815a087a0ee6?settings=a19a1641-24da-44cd-8f67-815a087a0ee6)",
                                            "paddingTop": "24px",
                                            "paddingLeft": "24px",
                                            "paddingRight": "24px"
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "14px",
                                            "markdown": "You're receiving this email because you have an active GardenIQ account. If you have questions or need support, please [contact us](www.gardeniq.io/contact).",
                                            "paddingTop": "16px",
                                            "paddingLeft": "24px",
                                            "paddingRight": "24px",
                                            "paddingBottom": "24px"
                                        }
                                    ],
                                    "bgColor": "#34364C",
                                    "borderRadius": "12px"
                                }
                            ],
                            "paddingTop": "50px",
                            "paddingLeft": "20px",
                            "paddingRight": "20px",
                            "paddingBottom": "30px"
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
                            "paddingLeft": "20px",
                            "paddingRight": "20px",
                            "paddingBottom": "50px",
                            "sourceTemplateId": 48
                        }
                    ]
                }
            ],
            "primaryColor": "#2A85FF",
            "linkTextStyle": "none",
            "foregroundColor": "WHITE"
        }
    },

    {
        name:'Workspace Ready',
        description:'A user receives this message when their workspace is ready',
        model:{
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
                                            "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/rnE5gR1WSLiaxO_Uz0pZkw",
                                            "type": "image",
                                            "linkUrl": "",
                                            "description": "Workspace_Complete.png",
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
                                            "type": "header",
                                            "markdown": "You're all set to get started",
                                            "headerLevel": 2
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "16px",
                                            "markdown": "Your workspace has been successfully configured based on your plan details. You can click below to login to your new GardenIQ workspace.",
                                            "lineHeight": "20px",
                                            "paddingTop": "24px"
                                        },
                                        {
                                            "tid": "cm80Sxg3RU6pnJEMtPg47Q",
                                            "url": "",
                                            "text": "Sign in to workspace",
                                            "type": "button",
                                            "action": "link",
                                            "marginTop": "40px",
                                            "borderRadius": "8px",
                                            "foregroundColor": "WHITE"
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
                                            "url": "https://heliosvs-bucksmediabucket70ce2cea-1sudjsqwxkv1.s3.amazonaws.com/pMaAVRtHTmG3fS6_8nctZg",
                                            "type": "image",
                                            "description": "Onboarding_Preview.png",
                                            "borderRadius": "10px"
                                        },
                                        {
                                            "type": "header",
                                            "markdown": "Start with onboarding",
                                            "paddingTop": "24px",
                                            "headerLevel": 2
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "16px",
                                            "markdown": "When you first log in to your workspace, you'll land on the Home dashboard. At the top, you'll find suggestions for setting up your organization details, inviting new users, connecting domains, platform integrations, consent and compliance settings for consumer privacy regulations, and much more.",
                                            "lineHeight": "20px",
                                            "paddingTop": "24px"
                                        },
                                        {
                                            "type": "text",
                                            "fontSize": "16px",
                                            "markdown": "For general or technical assistance with setup, please contact us at [support@gardeniq.io](mailto:support@gardeniq.io), or use the in-app support tool.",
                                            "lineHeight": "20px",
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
                            "paddingTop": "16px",
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
            "linkWeight": "600",
            "primaryColor": "#2A85FF",
            "linkTextStyle": "none",
            "foregroundColor": "#FFFFFF"
        }
    },
    {
        name:'Dual Column',
        description:'A template with a large hero image and side by side columns below',
        model:{
            "title": "Dual Column",
            "bgColor": "#EBEBEB",
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
                                            "type": "image",
                                            "maxWidth": "120px",
                                            "alignment": "center",
                                            "paddingTop": "20px",
                                            "paddingBottom": "16px"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "cols": [
                                1
                            ],
                            "blocks": [
                                {
                                    "items": [
                                        {
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
                            "blocks": [
                                {
                                    "items": [
                                        {
                                            "text": "Header",
                                            "type": "header",
                                            "paddingTop": "16px"
                                        },
                                        {
                                            "type": "text",
                                            "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                            "paddingTop": "16px"
                                        },
                                        {
                                            "url": "https://gardeniq.io",
                                            "text": "Shop Now",
                                            "type": "button",
                                            "alignment": "left",
                                            "marginTop": "40px",
                                            "borderRadius": "5px",
                                            "marginBottom": "40px"
                                        }
                                    ]
                                }
                            ],
                            "paddingTop": "20px",
                            "paddingLeft": "20px",
                            "paddingRight": "20px"
                        },
                        {
                            "cols": [
                                1
                            ],
                            "blocks": [
                                {
                                    "items": [
                                        {
                                            "type": "image",
                                            "paddingTop": "16px"
                                        },
                                        {
                                            "type": "text",
                                            "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                            "paddingTop": "16px"
                                        }
                                    ],
                                    "paddingRight": "10px"
                                },
                                {
                                    "items": [
                                        {
                                            "type": "image",
                                            "paddingTop": "16px"
                                        },
                                        {
                                            "type": "text",
                                            "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                            "paddingTop": "16px"
                                        }
                                    ],
                                    "paddingLeft": "5px",
                                    "paddingRight": "5px"
                                }
                            ],
                            "paddingLeft": "20px",
                            "paddingRight": "20px",
                            "paddingBottom": "60px"
                        }
                    ]
                }
            ],
            "primaryColor": "#000000",
            "foregroundColor": "#303030"
        }
    }
]


export const layout3x2Example:TemplateSection[]=[
    {
        "blocks": [
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingRight": "10px"
            },
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingLeft": "5px",
                "paddingRight": "5px"
            },
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingLeft": "10px"
            }
        ],
        "paddingLeft": "20px",
        "paddingRight": "20px",
        "paddingBottom": "50px"
    },
    {
        "blocks": [
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingRight": "10px"
            },
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingLeft": "5px",
                "paddingRight": "5px"
            },
            {
                "items": [
                    {
                        "type": "image",
                        "paddingTop": "16px"
                    },
                    {
                        "type": "text",
                        "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "paddingTop": "16px"
                    }
                ],
                "paddingLeft": "10px"
            }
        ],
        "paddingLeft": "20px",
        "paddingRight": "20px",
        "paddingBottom": "50px"
    }
]
