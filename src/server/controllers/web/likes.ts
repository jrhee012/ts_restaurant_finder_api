import { Request, Response } from "express";
import { Likes } from "../../models";
import { UsersModel } from "../../models/lib/Users";
import { redisClient, setAlerts, pagination } from "../../utils";
import { LikesModel } from "../../models/lib/Likes";

export const getAll = async (req: Request, res: Response) => {
    const user: UsersModel = res.locals.user;

    let likes: LikesModel[] = [];
    try {
        likes = await user.getAllLikes();
        if (likes.length > 0) {
            likes = await Likes.populate(likes, [
                {
                    path: "user_id",
                    model: "Users",
                },
                {
                    path: "restaurant_id",
                    model: "Restaurants",
                }
            ]);
        }
    } catch (e) {
        console.error(e.message);
        req.flash("error", "Internal server error.");
        return res.redirect("/");
    }

    const pageNum: number = parseInt(req.query.page) || 1;
    const alerts = setAlerts(req);

    const data = {
        user: user,
        likes: likes,
        page: pagination.getPage(likes.length, pageNum, 20, 10),
        alert: alerts.error,
        success: alerts.success,
    };

    return res.status(200).render("pages/likes/index", data);
};

export const addLike = async (req: Request, res: Response) => {
    console.log("Req path: ", req.originalUrl);
};
