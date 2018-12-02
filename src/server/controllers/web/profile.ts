import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/profile/index", data);
};

export const getAuthenticationPage = (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/profile/authenticate_form");
};

export const postAuthenticationPage = async (req: Request, res: Response) => {
    const params = req.body;
    if (params.email === undefined || params.email === null) {
        return res.redirect("/profile/authenticate");
    }
    if (params.password === undefined || params.password === null) {
        return res.redirect("/profile/authenticate");
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
        return res.redirect("/");
    }

    return res.redirect("/profile");
};
