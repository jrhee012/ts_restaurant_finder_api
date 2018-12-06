import { Request, Response } from "express";
import { Likes } from "../../models";
import { UsersModel } from "../../models/lib/Users";

// export const getAll = async (req: Request, res: Response) => {
//     const user: UsersModel = res.locals.user;

//     try {
//         const tickets = await user.getAllLikes();
//     }
// }