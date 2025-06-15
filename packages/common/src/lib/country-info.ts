export interface CountryInfo {
    name: string;
    abv: string;
}


export const countries:CountryInfo[] = [
    {
        name: 'United States',
        abv: "USA"
    }
]

export const getCountry=(name: string)=>{
    //logic
    return countries.find((country)=>country.name===name) ?? countries[0];
}
