import { Request, Response, NextFunction } from "express";
import { UsersModel } from "../../models/lib/Users";
import logger from "../../config/logger";

export const checkAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const user: UsersModel = res.locals.user;
    if (user === undefined || user === null) {
        return res.redirect("/");
    }
    try {
        const check: boolean = await user.checkValidation();
        if (!check) {
            req.flash("error", "Account not authenticated! Please go to your profile page to authenticate your account.");
            return res.redirect("/");
        }
        return next();
    } catch (e) {
        logger.error(e.message);
        req.flash("error", e.message);
        return res.redirect("/");
    }
};
