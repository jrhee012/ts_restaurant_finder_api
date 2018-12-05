import { Request } from "express";

export default (req: Request) => {
    const success: string[] = req.flash("success");
    const error: string[] = req.flash("error");
    return {
        success: success,
        error: error,
    };
};
