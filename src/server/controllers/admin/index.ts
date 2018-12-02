import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
    return res.status(200).render("pages/admin/index");
};
