import { Request, Response } from "express";
import { isEmpty } from "lodash";

export const getProfile = async (req: Request, res: Response) => {
    const user = res.locals.user;
    if (isEmpty(user)) {
        return res.redirect("/");
    }
    const data = { user: res.locals.user };
    // console.log("aaaaa", data, typeof data.user)
    // console.log(data.user.google)
    return res.status(200)
        .render("pages/profile/index", data);
};

export const updateProfile = async (req: Request, res: Response) => {
    const user = res.locals.user;
    if (isEmpty(user)) {
        return res.redirect("/");
    }
};

export const saveProfile = async (req: Request, res: Response) => {

};
