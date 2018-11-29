import { Request, Response } from "express";
import { Restaurants } from "../../models";
import { Document } from "mongoose";
import { responseBuilder } from "../../utils";

export const index = async (req: Request, res: Response) => {
    let result: Document[] = [];
    try {
        result = await Restaurants.find();
    } catch (e) {
        console.log("ERROR restaurant index controller");
        console.error(e);
        return res.status(500)
            .json(responseBuilder.internal_server_error());
    }
    return res.status(200)
        .json(result);
};
