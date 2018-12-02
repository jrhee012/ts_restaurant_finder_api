import { Request, Response } from "express";

export const getLogin = (req: Request, res: Response) => {
    console.log("login page!");
    // console.log(req.flash("error"));
    const flash = req.flash("error");
    const data = { user: res.locals.user, alert: flash };
    return res.status(200).render("pages/login/login", data);
};

export const getSignUp = (req: Request, res: Response) => {
    console.log("sign up page!");
    const flash = req.flash("error");
    const data = { user: res.locals.user, alert: flash };
    return res.status(200).render("pages/login/signup", data);
};
