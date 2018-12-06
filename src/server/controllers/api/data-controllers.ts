// import { Document } from "mongoose";
import { Request, Response } from "express";
import { Data } from "../../models";
import { DataModel } from "../../models/lib/Data";
import { responseBuilder } from "../../utils";
import { YelpApiClient } from "../../utils";

export const index = async (req: Request, res: Response) => {
    let data: DataModel[] = [];
    try {
        data = await Data.find();
    } catch (e) {
        console.log("ERROR data index controller");
        console.error(e.message);
        return res.status(500).json(responseBuilder.internal_server_error());
    }
    return res.status(200).json(data);
};

export const show = async (req: Request, res: Response) => {
    const dataId: string = req.params.data_id;

    let data: DataModel | null;
    try {
        data = await Data.findById(dataId);
    } catch (e) {
        console.log("ERROR data show controller");
        console.error(e.message);
        return res.status(500).json(responseBuilder.internal_server_error());
    }

    return res.status(200).json(data);
};

export const searchAndCreate = async (req: Request, res: Response) => {
    const query: {
        term: string,
        location: string,
    } = req.query;

    console.log("query", query);

    const yelp_client = new YelpApiClient();
    let result: any;
    try {
        result = await yelp_client.searchBusinesses(query);
    } catch (e) {
        console.log("ERROR data search and create controller");
        console.error(e.message);

        return res.status(500).json(responseBuilder.internal_server_error());
    }

    const data: any[] = result.businesses;

    if (data === undefined || data === null) {
        return res.status(500).json(responseBuilder.internal_server_error());
    }

    if (data.length < 1) {
        return res.status(404).json({
            code: 404,
            message: "Not Found",
            data: {
                query_location: query.location,
            },
        });
    }

    for (let i = 0; i < data.length; i++) {
        yelp_client.saveYelpData(data[i]);
    }

    return res.status(200).json({
        code: res.statusCode,
        message: "ok",
        data: {},
    });
};