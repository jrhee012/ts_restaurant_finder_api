import { Request, Response } from "express";
import { responseBuilder } from "../../utils";
import { Users } from "../../models";
import { UsersModel } from "../../models/lib/Users";
import logger from "../../config/logger";

export const getAll = async (req: Request, res: Response) => {
    let users: UsersModel[] = [];
    try {
        users = await Users.find();
    } catch (e) {
        logger.error(e);
        return res.status(500).json(responseBuilder.internal_server_error());
    }

    if (users.length < 1) {
        return res.status(404).json(responseBuilder.not_found_error());
    }

    return res.status(200).json(responseBuilder.api_response(users));
};

export const getOne = async (req: Request, res: Response) => {
    let user: UsersModel | null;
    try {
        user = await Users.findById(req.params.userId);
        if (user === null) {
            return res.status(404).json(responseBuilder.not_found_error());
        }
        return res.status(200).json(responseBuilder.api_response(user));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).json(responseBuilder.internal_server_error());
    }
};
