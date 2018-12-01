import { Request, Response } from "express";
import paginate from "jw-paginate";
import { Restaurants } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";
import { redisClient } from "../../utils";

export const getAll = async (req: Request, res: Response) => {
    // data.user = res.locals.user;
    let restaurants: RestaurantsModel[] = [];
    try {
        if (redisClient.cacheExists) {
            const cacheKey: string = `${__filename}`;
            const cache = await redisClient.get(cacheKey);
            if (cache !== null) {
                restaurants = JSON.parse(cache);
            } else {
                restaurants = await Restaurants.find();
                redisClient.set(cacheKey, restaurants);
            }
        } else {
            restaurants = await Restaurants.find();
        }
    } catch (e) {
        console.log("ERROR restaurants get all controller");
        console.error(e);
        return res.redirect("/");
    }

    const pageNum: number = req.query.page || 1;

    const data: {
        user: any,
        restaurants: RestaurantsModel[],
        page: any,
    } = {
        user: res.locals.user,
        restaurants: restaurants,
        page: paginate(restaurants.length, pageNum, 20, 10),
    };

    // console.log("data", data);
    return res.status(200).render("pages/restaurants/index", data);
};


// {
//     totalItems: 150,
//     currentPage: 1,
//     pageSize: 10,
//     totalPages: 15,
//     startPage: 1,
//     endPage: 10,
//     startIndex: 0,
//     endIndex: 9,
//     pages: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// }