import { TemplateModel } from '@buildhelios/types';

export const getDefaultTemplateModelById = (
    id: string
): TemplateModel | undefined => {
    switch (id) {
        case 'Message1Col':
            return templateMessage1Col;
        case 'Message1to1Col':
            return templateMessage1to1Col;
        case 'Message1to2Col':
            return templateMessage1to2Col;
        case 'Message1to3Col':
            return templateMessage1to3Col;
        case 'Message2to1Col': return templateMessage2to1Col;
        case 'Message2to2Col': return templateMessage2to2Col;
        case 'Message2to3Col': return templateMessage2to3Col;
        case 'Message2ColToGrid': return templateMessage2ColToGrid;
        case 'Message3to1Col': return templateMessage3to1Col;
        case 'Message3to2Col': return templateMessage3to2Col;
        case 'Message3to3Col': return templateMessage3to3Col;
        case 'Message3ColToGrid': return templateMessage3ColToGrid;
        default:
            return templateMessage1to2Col;
    }
};

export const templateMessage1Col: TemplateModel = {
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
}

export const templateMessage1to2Col: TemplateModel = {
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "text": "Header",
                                    "type": "header"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "60px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
}

export const templateMessage1to1Col: TemplateModel = {
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
}

const templateMessage1to3Col: TemplateModel = {
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "text": "Header",
                                    "type": "header"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Excepteur sint occaecat cupidatat non proident.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "60px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};


export const templateMessage2to1Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "50px",
                                    "text": "Enter headline here. Text will wrap.",
                                    "type": "header"
                                }
                            ],
                            "paddingLeft": "20px",
                            "paddingRight": "20px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage2to2Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "45px",
                                    "text": "Enter headline here. Text will wrap.",
                                    "type": "header"
                                }
                            ],
                            "paddingLeft": "20px",
                            "paddingRight": "20px"
                        },
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage2to3Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "45px",
                                    "text": "Enter headline here. Text will wrap.",
                                    "type": "header"
                                }
                            ],
                            "paddingLeft": "20px",
                            "paddingRight": "20px"
                        },
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginBottom": "60px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage2ColToGrid:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "45px",
                                    "text": "Enter headline here. Text will wrap.",
                                    "type": "header"
                                }
                            ],
                            "paddingLeft": "20px",
                            "paddingRight": "20px"
                        },
                        {
                            "items": [
                                {
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage3to1Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                },
                                {
                                    "borderRadius": "5px",
                                    "marginTop": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ],
                            "paddingRight": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage3to2Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage3to3Col:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
export const templateMessage3ColToGrid:TemplateModel={
    "bgColor": "#EBEBEB",
    "containers": [
        {
            "bgColor": "#FFFFFF",
            "sections": [
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "maxWidth": "120px",
                                    "paddingBottom": "16px",
                                    "paddingTop": "20px",
                                    "type": "image"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "paddingTop": "16px",
                                    "text": "Headline",
                                    "type": "header"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "5px",
                            "paddingRight": "5px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingLeft": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px",
                    "paddingTop": "50px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "alignment": "center",
                                    "borderRadius": "5px",
                                    "marginBottom": "40px",
                                    "text": "Shop Now",
                                    "type": "button",
                                    "url": "https://gardeniq.io"
                                }
                            ]
                        }
                    ],
                    "cols": [
                        1
                    ]
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                },
                {
                    "blocks": [
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        },
                        {
                            "items": [
                                {
                                    "paddingTop": "16px",
                                    "type": "image"
                                },
                                {
                                    "markdown": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                    "paddingTop": "16px",
                                    "type": "text"
                                }
                            ],
                            "paddingRight": "10px"
                        }
                    ],
                    "cols": [
                        1
                    ],
                    "paddingBottom": "50px",
                    "paddingLeft": "20px",
                    "paddingRight": "20px"
                }
            ]
        }
    ],
    "foregroundColor": "#303030",
    "primaryColor": "#000000",
    "title": "Subject"
};
