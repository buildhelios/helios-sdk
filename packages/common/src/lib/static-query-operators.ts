import { isQueryGroupCondition, StaticQueryOperator } from "@iyio/common";

export const limitedConditionQueryOperator:StaticQueryOperator={
    orderBy:true,
    op:(newData,query)=>{
        const condition=query.condition;
        if(!isQueryGroupCondition(condition)){
            return;
        }
        for(const c of condition.conditions){
            if(isQueryGroupCondition(c)){
                continue;
            }
            const col=(typeof c.left.col === 'string')?c.left.col:c.left.col?.name;
            const value=c.right.value;
            if(col===undefined || value===undefined){
                continue;
            }

            for(let i=0;i<newData.length;i++){
                let match=false;
                const item=newData[i];
                if(item){
                    switch(c.op){

                        case '>':
                            match=item[col]>(value as any)
                            break;

                        case '<':
                            match=item[col]<(value as any)
                            break;

                        case '>=':
                            match=item[col]>=(value as any)
                            break;

                        case '<=':
                            match=item[col]<=(value as any)
                            break;

                        case '=':
                            // eslint-disable-next-line eqeqeq
                            match=item[col]==(value as any)
                            break;

                        case '!=':
                            // eslint-disable-next-line eqeqeq
                            match=item[col]!=(value as any)
                            break;
                    }
                }

                if(!match){
                    newData.splice(i,1);
                    i--;
                }
            }

        }
    }
}
