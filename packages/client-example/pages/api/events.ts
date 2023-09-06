import { unminifyEventRecords } from "@buildhelios/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    try{
        const events=JSON.parse(req.body);
        unminifyEventRecords(events);
        console.log(events);
    }catch{
        console.log(req.body);
    }
    res.status(204);
    res.send('');
}
