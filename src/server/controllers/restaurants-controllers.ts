import { Request, Response } from "express";
import { Restaurants } from "../models";
import { Query } from "mongoose";

export const index = async (req: Request, res: Response) => {
    let result: Query;
    try {
        result = await Restaurants.find();
    }
    return res.status(200).send("ok!!!");
};
