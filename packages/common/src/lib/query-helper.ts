import { EventRecordTable } from "@buildhelios/sql-tables";
import { Series, SeriesRangeType } from "@iyio/common";
import { SeriesDataQueryOptions } from "@iyio/react-common";

export const makeQueryOptions=(type:string,rangeType:SeriesRangeType='<>'):SeriesDataQueryOptions=>({
    rangeColumn:'time',
    series:{
        repeat:2,
        offset:'month',
        offsetMultiplier:1,
        auto:{type:'month',count:4,useNumbers:true},
        rangeType
    },
    seriesQueries:{
        table:EventRecordTable.name,
        columns:[{func:'count',name:'count'}],
        condition:{
            left:{col:{name:'type'}},
            op:'=',
            right:{value:type}
        }
    }

})

export const mergeQuerySeries=(options:SeriesDataQueryOptions,series:Series<any>|null|undefined)=>{
    if(!series){
        series=options.series
    }
    if(options.series?.rangeType){
        series={...series,rangeType:options.series.rangeType}
    }
    return {...options,series}
}
