import { Request, Response } from "express";
import paginate from "jw-paginate";
import { Restaurants } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";
import { redisClient, YelpApiClient, setAlerts } from "../../utils";

const _redirectToRestaurants = (res: Response) => res.redirect("/restaurants");

export const getAll = async (req: Request, res: Response) => {
    let restaurants: RestaurantsModel[] = [];
    try {
        restaurants = await Restaurants.find();
        restaurants = await Restaurants.populate(restaurants, {
            path: "source_data",
            model: "Data"
        });
    } catch (e) {
        console.log("ERROR restaurants get all controller");
        console.error(e.message);
        return res.redirect("/");
    }

    const pageNum: number = req.query.page || 1;
    const alerts = setAlerts(req);

    const data = {
        user: res.locals.user,
        restaurants: restaurants,
        page: paginate(restaurants.length, pageNum, 20, 10),
        alert: alerts.error,
        success: alerts.success,
    };

    return res.status(200).render("pages/restaurants/index", data);
};

export const getOne = async (req: Request, res: Response) => {
    const rest_id: string = req.params.restaurantId;

    if (rest_id === undefined) {
        return _redirectToRestaurants(res);
    }

    let info: any;
    const api_client = new YelpApiClient();

    try {
        const rest: RestaurantsModel | null = await Restaurants.findById(rest_id);

        if (rest === null) {
            return _redirectToRestaurants(res);
        }

        await Restaurants.populate(rest, {
            path: "source_data",
            model: "Data"
        });

        const ext_id: string = rest.source_data[0].ext_id;

        if (redisClient.cacheExists) {
            const cacheKey: string = rest_id;
            const cache = await redisClient.get(cacheKey);
            info = cache;
            if (cache === null || cache === undefined) {
                // TODO: CAN USE DB DATA (ALMOST THE SAME AS API DATA)
                // info = await Data.findOne({ ext_id: rest_id });

                info = await api_client.searchOneBusniness(ext_id);
                redisClient.set(cacheKey, info);
            }
        } else {
            info = await api_client.searchOneBusniness(ext_id);
        }
    } catch (e) {
        console.log("ERROR restaurants get one controller");
        console.error(e.message);
        // TODO: REDIRECT TO 404 PAGE?
        req.flash("error", "Restaurant not found.");
        return res.redirect("/restaurants");
    }

    if (info === undefined) {
        req.flash("error", "Restaurant not found.");
        return res.redirect("/restaurants");
    }

    const data = {
        user: res.locals.user,
        info: info,
    };

    console.log("info", info);

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
