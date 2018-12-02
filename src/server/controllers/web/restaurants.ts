import { Request, Response } from "express";
import paginate from "jw-paginate";
import { Restaurants } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";
import { redisClient, YelpApiClient } from "../../utils";

const redirectToRestaurants = (res: Response) => res.redirect("/restaurants");

export const getAll = async (req: Request, res: Response) => {
    const cacheKey: string = `${__filename}`;
    let restaurants: RestaurantsModel[] = [];
    try {
        if (redisClient.cacheExists) {
            const cache = await redisClient.get(cacheKey);
            restaurants = cache;
            if (cache === null || cache === undefined) {
                restaurants = await Restaurants.find();
                restaurants = await Restaurants.populate(restaurants, { path: "source_data", model: "Data" });
                redisClient.set(cacheKey, restaurants);
            }
        } else {
            restaurants = await Restaurants.find();
            restaurants = await Restaurants.populate(restaurants, { path: "source_data", model: "Data" });
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

    return res.status(200).render("pages/restaurants/index", data);
};

export const getOne = async (req: Request, res: Response) => {
    const rest_id: string = req.params.restaurantId;

    if (rest_id === undefined) {
        return redirectToRestaurants(res);
    }

    let info: any;
    const cacheKey: string = rest_id;
    const api_client = new YelpApiClient();

    try {
        if (redisClient.cacheExists) {
            const cache = await redisClient.get(cacheKey);
            info = cache;
            if (cache === null || cache === undefined) {
                // TODO: CAN USE DB DATA (ALMOST THE SAME AS API DATA)
                // info = await Data.findOne({ ext_id: rest_id });

                info = await api_client.searchOneBusniness(rest_id);
                redisClient.set(cacheKey, info);
            }
        } else {
            info = await api_client.searchOneBusniness(rest_id);
        }
    } catch (e) {
        console.log("ERROR restaurants get one controller");
        console.error(e.message);
        return res.redirect("/");
    }

    if (info === undefined) {
        return res.status(404).render("pages/templates/404.ejs");
    }

    const data = {
        user: res.locals.user,
        info: info,
    };

    // console.log("info...!", info);
    return res.status(200).send("ok");
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
