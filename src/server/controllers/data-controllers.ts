import { Document } from "mongoose";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import configs from "../config";
import { Data } from "../models";
import { responseBuilder } from "../utils";
import { YelpApiClient } from "../utils";

export const index = async (req: Request, res: Response) => {
    let data: Document[] = [];
    try {
        data = await Data.find();
    } catch (e) {
        console.log("ERROR data index controller");
        console.error(e);
        return res.status(500)
            .json(responseBuilder.internal_server_error());
    }
    return res.status(200).json(data);
};

export const show = async (req: Request, res: Response) => {
    const dataId: string = req.params.data_id;

    let data: Document | null;
    try {
        data = await Data.findById(dataId);
    } catch (e) {
        console.log("ERROR data show controller");
        console.error(e);
        return res.status(500)
            .json(responseBuilder.internal_server_error());
    }

    return res.status(200).json(data);
};

// export const create = async (req: Request, res: Response) => {
//     const params = req.body;
// };

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
        // console.log("results: ", result);
    } catch (e) {
        console.log("ERROR data search and create controller");
        console.error(e);

        return res.status(500)
            .json(responseBuilder.internal_server_error());
    }

    const data: any[] = result.businesses;

    if (data === undefined || data === null) {
        return res.status(500)
            .json(responseBuilder.internal_server_error());
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

    // return res.status(200).json(result);
};