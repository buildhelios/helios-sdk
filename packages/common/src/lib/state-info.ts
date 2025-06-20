

export interface StateInfo {
    name: string;
    abv: string;
}

export const caStates:StateInfo[]=[
    {name:'Alberta',abv:'AB'},
    {name:'British Columbia',abv:'BC'},
    {name:'Manitoba',abv:'MB'},
    {name:'New Brunswick',abv:'NB'},
    {name:'Newfoundland and Labrador',abv:'NL'},
    {name:'Northwest Territories',abv:'NT'},
    {name:'Nova Scotia',abv:'NS'},
    {name:'Nunavut',abv:'NU'},
    {name:'Ontario',abv:'ON'},
    {name:'Prince Edward Island',abv:'PE'},
    {name:'Quebec',abv:'QC'},
    {name:'Saskatchewan',abv:'SK'},
    {name:'Yukon',abv:'YT'},
]

export const usStates:StateInfo[] = [
    {
        name: 'Alabama',
        abv: 'AL'
    },
    {
        name: 'Alaska',
        abv: 'AK'
    },
    {
        name: 'Arizona',
        abv: 'AZ'
    },
    {
        name: 'Arkansas',
        abv: 'AR'
    },
    {
        name: 'California',
        abv: 'CA'
    },
    {
        name: 'Colorado',
        abv: 'CO'
    },
    {
        name: 'Connecticut',
        abv: 'CT'
    },
    {
        name: 'Delaware',
        abv: 'DE'
    },
    {
        name: 'District of Columbia',
        abv: '	DC'
    },
    {
        name: 'Florida',
        abv: 'FL'
    },
    {
        name: 'Georgia',
        abv: 'GA'
    },
    {
        name: 'Hawaii',
        abv: 'HI'
    },
    {
        name: 'Idaho',
        abv: 'ID'
    },
    {
        name: 'Illinois',
        abv: '	IL'
    },
    {
        name: 'Indiana',
        abv: 'IN'
    },
    {
        name: 'Iowa',
        abv: 'IA'
    },
    {
        name: 'Kansas',
        abv: 'KS'
    },
    {
        name: 'Kentucky',
        abv: 'KY'
    },
    {
        name: 'Louisiana',
        abv: 'LA'
    },
    {
        name: 'Maine',
        abv: 'ME'
    },
    {
        name: 'Maryland',
        abv: 'MD'
    },
    {
        name: 'Massachusetts',
        abv: 'MA'
    },
    {
        name: 'Michigan',
        abv: 'MI'
    },
    {
        name: 'Minnesota',
        abv: 'MN'
    },
    {
        name: 'Mississippi',
        abv: 'MS'
    },
    {
        name: 'Missouri',
        abv: 'MO'
    },
    {
        name: 'Montana',
        abv: 'MT'
    },
    {
        name: 'Nebraska',
        abv: 'NE'
    },
    {
        name: 'Nevada',
        abv: 'NV'
    },
    {
        name: 'New Hampshire',
        abv: 'NH'
    },
    {
        name: 'New Jersey',
        abv: 'NJ'
    },
    {
        name: 'New Mexico',
        abv: 'NM'
    },
    {
        name: 'New York',
        abv: 'NY'
    },
    {
        name: 'North Carolina',
        abv: 'NC'
    },
    {
        name: 'North Dakota',
        abv: 'ND'
    },
    {
        name: 'Ohio',
        abv: 'OH'
    },
    {
        name: 'Oklahoma',
        abv: 'OK'
    },
    {
        name: 'Oregon',
        abv: 'OR'
    },
    {
        name: 'Pennsylvania',
        abv: 'PA'
    },
    {
        name: 'Rhode Island',
        abv: 'RI'
    },
    {
        name: 'South Carolina',
        abv: 'SC'
    },
    {
        name: 'South Dakota',
        abv: 'SD'
    },
    {
        name: 'Tennessee',
        abv: 'TN'
    },
    {
        name: 'Texas',
        abv: 'TX'
    },
    {
        name: 'Utah',
        abv: 'UT'
    },
    {
        name: 'Vermont',
        abv: 'VT'
    },
    {
        name: 'Virginia',
        abv: 'VA'
    },
    {
        name: 'Washington',
        abv: 'WA'
    },
    {
        name: 'West Virginia',
        abv: 'WV'
    },
    {
        name: 'Wisconsin',
        abv: 'WI'
    },
    {
        name: 'Wyoming',
        abv: 'WY'
    },
]




export const getState=(name: string)=>{
    //logic
    return usStates.find((state)=>state.name===name) ?? usStates[0];
}












































