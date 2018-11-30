import { Request, Response } from "express";

export const getLogin = (req: Request, res: Response) => {
    console.log("login page!");
    console.log(req.flash("error"))
    const data = { user: res.locals.user };
    return res.status(200)
        .render("pages/login/login", data);
};

export const getSignUp = (req: Request, res: Response) => {
    console.log("sign up page!");
    console.log(req.flash("signupMessage"))
    const data = { user: res.locals.user };
    return res.status(200)
        .render("pages/login/signup", data);
};
