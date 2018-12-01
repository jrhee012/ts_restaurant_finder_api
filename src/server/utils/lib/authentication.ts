import { Request, Response, NextFunction } from "express";

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (user === undefined || user === null) {
        return res.redirect("/");
    }
    if (!user.authenticated) {
        return res.redirect("/");
    }
    next();
};
