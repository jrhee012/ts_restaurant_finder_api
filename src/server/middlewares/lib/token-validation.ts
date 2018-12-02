import { Request, Response, NextFunction } from "express";
import { responseBuilder } from "../../utils";
import configs from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.headers.token === "string") {
        const token: string = req.headers.token;
        if (token === configs.TOKEN) {
            return next();
        }
    }
    return res.status(401).json(responseBuilder.unauthorized_error());
};
