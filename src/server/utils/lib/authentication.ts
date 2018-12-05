import { Request, Response, NextFunction } from "express";
import { UsersModel } from "../../models/lib/Users";

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const user: UsersModel = res.locals.user;
    if (user === undefined || user === null) {
        return res.redirect("/");
    }
    if (!user.checkValidation()) {
        return res.redirect("/");
    }
    next();
};
