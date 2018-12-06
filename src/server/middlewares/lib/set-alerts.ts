import { Request, NextFunction, Response } from "express";
import { setAlerts } from "../../utils";

export default (req: Request, res: Response, next: NextFunction) => {
    const alerts = setAlerts(req);
    res.locals.alerts = alerts;
    next();
};
