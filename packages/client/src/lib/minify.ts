import { CommonEventTypesFromAlias, CommonEventTypesToAlias, EventRecord, EventRecordFromAlias, EventRecordToAlias } from "@buildhelios/types";

/**
 * Minifies an EventRecord object in-place. This function mutates the EventRecord and after being
 * called the given event will no longer implement to EventRecord interface.
 */
export const minifyEventRecord=(event:Partial<EventRecord>):void=>{
    if(event.type){
        const type=(CommonEventTypesToAlias as any)[event.type]?.default;
        if(type){
            event.type=type;
        }
    }
    for(const e in event){
        const v=(event as any)[e];
        if(v===undefined){
            delete (event as any)[e];
            continue;
        }
        const to=(EventRecordToAlias as any)[e]?.default;
        if(to){
            delete (event as any)[e];
            (event as any)[to]=v;
        }
    }
}


/**
 * Minifies all EventRecord objects in-place. Any properties that are the same for all objects
 * will have there name added to a _CP_ array property on the first event object and deleted
 * from the other objects.
 */
export const minifyEventRecords=(events:Partial<EventRecord>[]):void=>{

    for(const event of events){
        minifyEventRecord(event);
    }

    const first:any=events[0];
    if(first){
        let hasCopies=false;
        const copyMap:Record<string,number>={}
        for(let i=1;i<events.length;i++){
            const ce:any=events[i];
            if(!ce){
                continue;
            }
            for(const e in first){
                if(first[e]===ce[e]){
                    if((copyMap[e]=(copyMap[e]??1)+1)===events.length){
                        hasCopies=true;
                    }
                }
            }
        }

        if(hasCopies){
            const copies:string[]=[];
            for(const e in copyMap){
                copies.push(e);
                for(let i=1;i<events.length;i++){
                    const ce:any=events[i];
                    if(!ce){
                        continue;
                    }
                    delete ce[e];
                }
            }
            first._CP_=copies;
        }

    }

}

/**
 * Reverses minification in-place. The event will be mutated and after being called may implement
 * the EventRecord interface.
 */
export const unminifyEventRecord=(event:Partial<EventRecord>):void=>{
    for(const e in event){
        const v=(event as any)[e];
        if(v===undefined){
            delete (event as any)[e];
            continue;
        }
        const to=(EventRecordFromAlias as any)[e]?.default;
        if(to){
            delete (event as any)[e];
            (event as any)[to]=v;
        }
    }
    if(event.type){
        const type=(CommonEventTypesFromAlias as any)[event.type]?.default;
        if(type){
            event.type=type;
        }
    }
}

/**
 * Reverses minification and restores copied properties in-place.
 */
export const unminifyEventRecords=(events:Partial<EventRecord>[]):void=>{

    const first:any=events[0];
    if(first && Array.isArray(first._CP_)){
        const copy:string[]=first._CP_;

        for(let i=1;i<events.length;i++){
            const ce:any=events[i];
            if(!ce){
                continue;
            }
            for(const prop of copy){
                ce[prop]=first[prop];
            }
        }
        delete first._CP_;


    }

    for(const event of events){
        unminifyEventRecord(event);
    }

}
