import { RestaurantsModel } from "../../models/lib/Restaurants";
import { Restaurants } from "../../models";

export default class RestaurantDataFetcher {
    restaurants: RestaurantsModel[];

    constructor() {
        this.restaurants = [];
    }

    private async getRestaurants() {
        const data: RestaurantsModel[] | null = await Restaurants.find();

        if (data === null) {
            return;
        } else {
            this.restaurants = data;
            return;
        }
    }

    checkRestaurant(restaurant: RestaurantsModel) {}
}



// https://www.opentable.com/s/?covers=2&dateTime=2018-12-03%2019%3A00&latitude=40.75&longitude=-73.9967&metroId=8&term=buddakan&includeTicketedAvailability=true&pageType=0