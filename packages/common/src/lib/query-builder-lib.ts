import { EventRecordTable, ProfileTable } from "@buildhelios/sql-tables";
import { NamedValue, Query, QueryCondition, QueryConditionOp, QueryConditionOrGroup, dayMs, deepClone, escapeHtml, safeParseNumber } from "@iyio/common";

export interface And
{
    id:string;
    ors:Or[];
}

type OrType='empty'|'has'|'where'|'contact';
export interface Or<TState=any>
{
    id:string;
    type:OrType;
    title:string;
    values:RuleValue<TState>[];
    initState?:()=>TState;
    stateToQuery?:(state:TState,or:Or<TState>)=>Query;
}

type RuleValueType='label'|'select'|'text-input';
export interface RuleValue<TState=any>
{
    id:string;
    type:RuleValueType;
    options?:RuleValueOption<TState>[];
    text?:string;
    startText?:string;
    value?:RuleValueOption<TState>;
    textValue?:string;
    hide?:(state:TState)=>boolean;
}
export interface RuleValueOption<TState=any>
{
    id:string;
    name:string;
    apply?:(state:TState)=>void;
}


const hasOr:Or<{
    type:string;
    count:number;
    usesTime:boolean;
    unitCount:number;
    unitMultiple:number;

}>={
    id:'has',
    type:'has',
    title:'Has',
    initState:()=>({
        type:'mo',
        count:0,
        usesTime:false,
        unitCount:1,
        unitMultiple:1

    }),
    values:[
        {id:'has-label',type:'label',text:'Has',startText:'that has'},
        {id:'type',type:'select',options:[
            {
                id:'open',
                name:'opened message',
                apply:s=>s.type='messageOpen',
            },
            {
                id:'messageSent',
                name:'received message',
                apply:s=>s.type='messageSent',
            },
            {
                id:'visit',
                name:'visited website',
                apply:s=>s.type='sessionStart',
            },
            {
                id:'cta',
                name:'followed message CTA',
                apply:s=>s.type='messageCta',
            },
            {
                id:'newProfile',
                name:'create new profile',
                apply:s=>s.type='newProfile',
            },
            {
                id:'cartAdd',
                name:'add product to cart',
                apply:s=>s.type='cartAdd',
            },
            {
                id:'cartRemove',
                name:'removed product from cart',
                apply:s=>s.type='cartRemove',
            },
            {
                id:'cartCheckout',
                name:'purchased product',
                apply:s=>s.type='cartCheckout',
            },
            {
                id:'cartAbandon',
                name:'abandoned cart',
                apply:s=>s.type='cartAbandon',
            },
            {
                id:'sessionStart',
                name:'started session',
                apply:s=>s.type='sessionStart',
            }
        ]},
        {id:'count',type:'select',options:[
            {
                id:'1',
                name:'at least once',
                apply:s=>s.count=1,
            },
            {
                id:'2',
                name:'twice or more',
                apply:s=>s.count=2,
            },
            {
                id:'10',
                name:'more than 10 times',
                apply:s=>s.count=10,
            }
        ]},
        {id:'usesTime',type:'select',options:[
            {
                id:'uses-time',
                name:'in the last',
                apply:s=>s.usesTime=true,
            },
            {
                id:'not-time',
                name:'since identified',
                apply:s=>s.usesTime=false,
            },
        ]},
        {id:'unitCount',type:'select',hide:s=>!s.usesTime,options:[
            {
                id:'120',
                name:'120',
                apply:s=>s.unitCount=120,
            },
            {
                id:'60',
                name:'60',
                apply:s=>s.unitCount=60,
            },
            {
                id:'30',
                name:'30',
                apply:s=>s.unitCount=30,
            },
            {
                id:'12',
                name:'12',
                apply:s=>s.unitCount=12,
            },
            {
                id:'7',
                name:'7',
                apply:s=>s.unitCount=7,
            },
            {
                id:'6',
                name:'6',
                apply:s=>s.unitCount=6,
            },
            {
                id:'5',
                name:'5',
                apply:s=>s.unitCount=5,
            },
            {
                id:'3',
                name:'3',
                apply:s=>s.unitCount=3,
            },
            {
                id:'2',
                name:'2',
                apply:s=>s.unitCount=2,
            },
            {
                id:'1',
                name:'1',
                apply:s=>s.unitCount=1,
            },
        ]},
        {id:'unitMultiple',type:'select',hide:s=>!s.usesTime,options:[
            {
                id:'d',
                name:'days',
                apply:s=>s.unitMultiple=1,
            },
            {
                id:'w',
                name:'weeks',
                apply:s=>s.unitMultiple=7,
            },
            {
                id:'m',
                name:'months',
                apply:s=>s.unitMultiple=30,
            },
        ]},
    ],
    stateToQuery:s=>{
        const {
            type,
            count,
            usesTime,
            unitCount,
            unitMultiple,

        }=s;
        const typeCond:QueryCondition={
            left:{col:'type'},
            op:'=',
            right:{value:type}
        }
        const subQuery:Query={
            table:EventRecordTable.name,
            columns:[
                {name:'profileId',col:'profileId'},
                {name:'count',func:'count'}
            ],
            condition:usesTime?{
                op:'and',
                conditions:[
                    typeCond,
                    {
                        left:{col:'time'},
                        op:'>',
                        right:{generatedValue:{type:'timeMs',offset:-(unitCount*dayMs*unitMultiple)}}
                    }
                ]
            }:typeCond,
            groupBy:'profileId'
        };
        const query:Query={
            table:subQuery,
            columns:[{name:'profileId',col:'profileId'}],
            condition:{
                left:{col:'count'},
                op:'>=',
                right:{value:count}
            }
        };

        return query;
    }
}

const contactOr:Or<{
    isIn:boolean;
    listId:number;
}>={
    id:'contact',
    type:'contact',
    title:'Contact',
    initState:()=>({
        isIn:true,
        listId:0,
    }),
    values:[
        {id:'contact-label',type:'label',text:'Contact',startText:'where contact'},
        {id:'isIn',type:'select',options:[
            {
                id:'is',
                name:'is',
                apply:s=>s.isIn=true,
            },
            {
                id:'not',
                name:'is not',
                apply:s=>s.isIn=false,
            },
        ]},
        {id:'in-label',type:'label',text:'In'},
        {id:'listId',type:'select',options:[
            {
                id:'1',
                name:'Newsletter',
            },
            {
                id:'2',
                name:'SMS list',
            },
            {
                id:'3',
                name:'Mailing list',
            },
        ]},
    ]
}

const whereOr:Or<{
    property:string;
    op:QueryConditionOp;
    likeType:'start'|'contain'|'end';
    valueType:'string'|'number'|'boolean'|'time'|'int'|'select';

}>={
    id:'where',
    type:'where',
    title:'Where',
    initState:()=>({
        property:'email',
        op:'=',
        likeType:'start',
        valueType:'string',
    }),
    values:[
        {id:'where-label',type:'label',text:'Where'},
        {id:'property',type:'select',text:'Choose property',options:[
            {
                id:'id',
                name:'id',
                apply:s=>{s.valueType='int';s.property='id'},
            },
            {
                id:'name',
                name:'name',
                apply:s=>{s.valueType='string';s.property='name'},
            },
            {
                id:'firstName',
                name:'firstName',
                apply:s=>{s.valueType='string';s.property='firstName'},
            },
            {
                id:'middleName',
                name:'middleName',
                apply:s=>{s.valueType='string';s.property='middleName'},
            },
            {
                id:'lastName',
                name:'lastName',
                apply:s=>{s.valueType='string';s.property='lastName'},
            },
            {
                id:'email',
                name:'email',
                apply:s=>{s.valueType='string';s.property='email'},
            },
            {
                id:'website',
                name:'domain',
                apply:s=>{s.valueType='string';s.property='host'},
            },
            {
                id:'created',
                name:'created',
                apply:s=>{s.valueType='time';s.property='created'},
            },
            {
                id:'lastActivity',
                name:'lastActivity',
                apply:s=>{s.valueType='time';s.property='lastActivity'},
            },
            {
                id:'timezone',
                name:'timezone',
                apply:s=>{s.valueType='string';s.property='timezone'},
            },
            {
                id:'phone',
                name:'phone',
                apply:s=>{s.valueType='string';s.property='phone'},
            },
            {
                id:'country',
                name:'country',
                apply:s=>{s.valueType='string';s.property='country'},
            },
            {
                id:'state',
                name:'state',
                apply:s=>{s.valueType='string';s.property='state'},
            },
            {
                id:'city',
                name:'city',
                apply:s=>{s.valueType='string';s.property='city'},
            },
            {
                id:'address',
                name:'address',
                apply:s=>{s.valueType='string';s.property='address'},
            },
            {
                id:'address2',
                name:'address2',
                apply:s=>{s.valueType='string';s.property='address2'},
            },
            {
                id:'postalCode',
                name:'postalCode',
                apply:s=>{s.valueType='string';s.property='postalCode'},
            },
            {
                id:'birthDate',
                name:'birthDate',
                apply:s=>{s.valueType='time';s.property='birthDate'},
            },
            // {
            //     id:'status',
            //     name:'status',
            //     apply:s=>{s.valueType='SubscriptionStatus';s.property='status'},
            // },
            {
                id:'identificationSource',
                name:'identificationSource',
                apply:s=>{s.valueType='string';s.property='identificationSource'},
            },
            {
                id:'identifiedAt',
                name:'identifiedAt',
                apply:s=>{s.valueType='time';s.property='identifiedAt'},
            },
            {
                id:'primaryLocationId',
                name:'primaryLocationId',
                apply:s=>{s.valueType='int';s.property='primaryLocationId'},
            },
            // {
            //     id:'preferredChannel',
            //     name:'preferredChannel',
            //     apply:s=>{s.valueType='CommsChannel';s.property='preferredChannel'},
            // },


        ]},
        {id:'where-is',type:'label',text:'Is'},
        {id:'eq-label',type:'select',text:'Select operator',options:[
            {
                id:'=',
                name:'equal to',
                apply:s=>s.op='=',
            },
            {
                id:'!=',
                name:'not equal to',
                apply:s=>s.op='!=',
            },
            {
                id:'>',
                name:'more than',
                apply:s=>s.op='>',
            },
            {
                id:'<',
                name:'less than',
                apply:s=>s.op='<',
            },
            {
                id:'>=',
                name:'more than equal to',
                apply:s=>s.op='>=',
            },
            {
                id:'<=',
                name:'less than equal to',
                apply:s=>s.op='<=',
            },
            {
                id:'starts-with',
                name:'starts with',
                apply:s=>{s.op='like';s.likeType='start'},
            },
            {
                id:'ends-with',
                name:'ends with',
                apply:s=>{s.op='like';s.likeType='end'},
            },
            {
                id:'contains',
                name:'contains',
                apply:s=>{s.op='like';s.likeType='contain'},
            },
            // {
            //     id:'is',
            //     name:'',
            //     apply:s=>s.op='is',
            // },
            // {
            //     id:'in',
            //     name:'',
            //     apply:s=>s.op='in',
            // },
        ]},
        {id:'value',type:'text-input',text:'Enter value'},
    ],
    stateToQuery:(s,or)=>{
        const {
            property,
            op,
            valueType,
            likeType,
        }=s;
        const value=or.values.find(v=>v.id==='value')?.textValue??'';
        let v=(
            (valueType==='int' || valueType==='number' || valueType==='time')?
                (safeParseNumber(value),0)
            :valueType==='boolean'?
                ['1','true','yes'].includes(value.toLowerCase())
            :
                value
        )
        if(op==='like'){
            switch(likeType){
                case 'start':
                    v=`${v}%`;
                    break;
                case 'end':
                    v=`%${v}`;
                    break;
                case 'contain':
                    v=`%${v}%`;
                    break;
            }
        }
        const query:Query={
            table:ProfileTable.name,
            columns:[{name:'id',col:'id'}],
            condition:{
                left:{col:property},
                op,
                right:{value:v}
            }
        };

        return query;
    }
}

const defaultOrs:Or[]=[
    hasOr,
    whereOr,
    contactOr,
]

export const orOptions:NamedValue<Or>[]=defaultOrs.map(d=>({
    name:d.title,
    value:d
}))

export const defaultOr:Or={
    id:'empty',
    type:'empty',
    title:'empty',
    values:[]

}

export const defaultAnd:And={
    id:'and',
    ors:[deepClone(defaultOr)]
}

export const queryRulesToQuery=(include:(And|null|undefined)[]|undefined|null,exclude?:(And|null|undefined)[]|null):Query|undefined=>{

    const inc=[
        ...(include?.map(v=>v?andQueryRuleToQuery(v):null).filter(v=>v)??[]),
        ...(exclude?.map(v=>v?andQueryRuleToQuery(v,true):null).filter(v=>v)??[])
    ] as QueryConditionOrGroup[];

    const condition:QueryConditionOrGroup|undefined=(
        !inc.length?
            undefined
        :inc.length>1?
            {
                op:'and',
                conditions:inc
            }
        :
            inc[0]
    );

    const query:Query={
        table:ProfileTable.name,
        condition
    }

    return query.condition?query:undefined;

}

export const andQueryRuleToQuery=(and:And,not?:boolean):QueryConditionOrGroup|undefined=>{
    const queries=and.ors.map(orQueryRuleToQuery).filter(q=>q) as Query[];

    if(!queries.length){
        return undefined;
    }

    const conditions:QueryCondition[]=queries.map(q=>({
        left:{col:'id'},
        not,
        op:'in',
        right:{subQuery:{query:q}}
    }));

    return conditions.length===1?conditions[0]:{
        op:'or',
        conditions,
    }

}

export const orQueryRuleToQuery=(or:Or):Query|undefined=>{
    const state=getOrQueryState(or);

    return or.stateToQuery?.(state,or);
}

export const getOrQueryState=<T>(or:Or<T>):T|undefined=>{
    const state=or.initState?.();
    if(!state){
        return undefined;
    }
    for(const value of or.values){
        const selected=value.value;
        if(selected){
            selected.apply?.(state);
        }
    }

    return state;
}

export const selectAndQueryDefaults=(and:And):And=>{

    for(const or of and.ors){
        for(const v of or.values){
            if(!v.value && v.options){
                v.value=v.options[0];
            }
        }
    }

    return and;
}
export const selectOrQueryDefaults=<T>(or:Or<T>):Or<T>=>{

    for(const v of or.values){
        if(!v.value && v.options){
            v.value=v.options[0];
        }
    }

    return or;
}

export const initAndQuery=(and:And):And=>{
    and=deepClone(and);

    for(const or of and.ors){
        const match=defaultOrs.find(o=>o.id==or.id);
        if(!match){
            continue;
        }
        addFns(match,or);

        if(or.values){
            for(const value of or.values){
                const valueMatch=match.values.find(v=>v.id===value.id);
                if(!valueMatch){
                    continue;
                }

                addFns(valueMatch,value);

                if(value.value){
                    value.value=value.options?.find(v=>v.id===value.value?.id);
                }

                if(value.options && valueMatch.options){
                    for(const option of value.options){
                        const optionMatch=valueMatch.options.find(o=>o.id===option.id);
                        if(!optionMatch){
                            continue;
                        }

                        addFns(optionMatch,option);
                    }
                }
            }
        }

    }

    return and;
}

const addFns=<T>(hasFn:T,addFns:T)=>{
    for(const e in hasFn){
        const v=hasFn[e];
        if(typeof v !== 'function'){
            continue;
        }
        if(!addFns[e]){
            addFns[e]=v;
        }
    }
}

export interface GetNaturalLanguageForAndsOptions
{
    subject:string;
    inState?:And[];
    exState?:And[];
    format?:'html'|'markdown';
}

export const getNaturalLanguageForAnds=({
    subject,
    inState,
    exState,
    format,
}:GetNaturalLanguageForAndsOptions):string=>{

    if(!inState?.length && !exState?.length){
        return `Any ${subject}`;
    }

    const ins=inState?.length?getNlForAnds(inState,format):null;
    const exs=exState?.length?getNlForAnds(exState,format):null;

    if(!exs){
        return `${subject} ${ins}`;
    }else if(!ins){
        return `Excluding ${subject} ${exs}`
    }else{
        return `${subject} ${ins}, excluding ${subject} ${exs}`;
    }


}

const getNlForAnds=(state:And[],format?:'html'|'markdown'):string=>{

    const out:string[]=[];

    for(let a=0;a<state.length;a++){
        const and=state[a];
        if(!and){continue}

        if(a){
            out.push('and')
        }

        for(let o=0;o<and.ors.length;o++){
            const or=and.ors[o];
            if(!or){continue}

            if(o){
                out.push('or')
            }


            for(let vi=0;vi<or.values.length;vi++){
                const v=or.values[vi];
                if(!v){continue}

                let value='';

                switch(v.type){

                    case 'label':
                        value=((vi===0 && o===0)?(v.startText??v.text):v.text)?.toLowerCase()??'';
                        break;

                    case 'select':
                        value=v.value?.name??'';
                        break;

                    case 'text-input':
                        value=v.textValue??'';
                        break;
                }

                if(format==='markdown'){
                    out.push(`**${value}**`);
                }else if(format==='html'){
                    out.push(`<b>${escapeHtml(value)}</b>`)
                }else{
                    out.push(value);
                }
            }
        }
    }

    return out.join(' ');
}
