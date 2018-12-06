import { Request } from "express";

export interface IAlerts {
    success: string[];
    error: string[];
}

export default (req: Request) => {
    const success: string[] = req.flash("success");
    const error: string[] = req.flash("error");
    return {
        success: success,
        error: error,
    };
};
