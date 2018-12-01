import { Request, Response } from "express";
import { isEmpty } from "lodash";

export const getProfile = async (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/profile/index", data);
};

export const updateProfile = async (req: Request, res: Response) => {
    const user = res.locals.user;
};

export const saveProfile = async (req: Request, res: Response) => {

};

export const getAuthenticationPage = (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/profile/authenticate_form");
};
