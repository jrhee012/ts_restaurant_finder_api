import { Document } from "mongoose";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import configs from "../config";
import { Data } from "../models";
import { responseBuilder } from "../utils";

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
    return res.status(200)
        .json(data);
};
