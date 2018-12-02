import { Request, Response } from "express";
import * as EmailValidator from "email-validator";

export const getProfile = async (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/profile/index", data);
};

export const getAuthenticationPage = (req: Request, res: Response) => {
    const data = { user: res.locals.user , alert: [] };
    return res.status(200)
        .render("pages/profile/authenticate_form", data);
};

export const postAuthenticationPage = async (req: Request, res: Response) => {
    const data: {
        user: any,
        alert: string[],
    } = { user: res.locals.user, alert: [] };

    const params = req.body;

    if (params.email === undefined || params.email === null) {
        data.alert.push("Email required");
        return res.status(400)
            .render("pages/profile/authenticate_form", data);
    }

    if (!EmailValidator.validate(params.email)) {
        data.alert.push("Invalid email");
        return res.status(400)
            .render("pages/profile/authenticate_form", data);
    }

    if (params.password === undefined || params.password === null) {
        data.alert.push("Password required");
        return res.status(400)
            .render("pages/profile/authenticate_form", data);
    }

    const user = res.locals.user;
    try {
        user.local.email = params.email;
        user.setPassword(params.password);
        user.authenticated = true;
        await user.save();
    } catch (e) {
        console.log("ERROR post authenticate user controller");
        console.error(e.message);
    }
    return res.redirect("/profile");
};

export const getLinkAccountPage = (req: Request, res: Response) => {
    const data = { user: res.locals.user, alert: [] };
    return res.status(200).render("pages/profile/link_account", data);
};