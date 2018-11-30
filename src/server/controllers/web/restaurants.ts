import { Request, Response } from "express";
import paginate from "jw-paginate";
import { Restaurants } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";

export const getAll = async (req: Request, res: Response) => {
    // data.user = res.locals.user;
    let restaurants: RestaurantsModel[] = [];
    try {
        restaurants = await Restaurants.find();
    } catch (e) {
        console.log("ERROR restaurants get all controller");
        console.error(e);
        return res.redirect("/");
    }

    const data: {
        user: any,
        restaurants: RestaurantsModel[],
    } = {
        user: res.locals.user,
        restaurants: restaurants,
    };

    // console.log('data', data);
    let page = paginate(restaurants.length, 1, 10, 10);
    return res.status(200).render("pages/restaurants/index", data);
};
