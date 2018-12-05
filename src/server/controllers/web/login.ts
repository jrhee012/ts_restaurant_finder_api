import { Request, Response } from "express";
import { setAlerts } from "../../utils";

export const getLogin = (req: Request, res: Response) => {
    const alerts = setAlerts(req);
    const data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success
    };
    return res.status(200).render("pages/login/login", data);
};

export const getSignUp = (req: Request, res: Response) => {
    const alerts = setAlerts(req);
    const data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success
    };
    return res.status(200).render("pages/login/signup", data);
};
