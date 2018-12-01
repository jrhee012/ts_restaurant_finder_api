import rp, { OptionsWithUri, RequestPromise } from "request-promise";
import _ from "lodash";
import configs from "../../config";
import { Data, Restaurants } from "../../models";
// import { DataModel } from "../../models/Data";
// import { Restaurant } from "../../models/Restaurants";

// export interface Coords {
//     lat: number | string;
//     long: number | string;
// }

export interface ApiClientQuery {
    term: string;
    location: string;
}

export interface YelpSearchQuery {
    term: string;
    type: string;
    sort_by: string;
    location: string;
    limit: number;
}

class ApiClient {
    // httpOptions: OptionsWithUri;

    constructor() {

    }

    async makeCall(httpOptions: OptionsWithUri) {
        if (configs.NODE_ENV !== "production") {
            console.log(`Calling: ${JSON.stringify(httpOptions.uri)}`);
            console.log(`Headers: ${JSON.stringify(httpOptions.headers)}`);
            console.log(`Body: ${JSON.stringify(httpOptions.body)}`);
            console.log(`QS: ${JSON.stringify(httpOptions.qs)}`);
        }

        const isJson = httpOptions.json;
        if (isJson === null || isJson === undefined || !isJson) {
            _.assign(httpOptions, { json: true });
        }

        let result;
        try {
            result = await rp(httpOptions);
        } catch (e) {
            console.log("ERROR ApiClient makeCall");
            if (configs.NODE_ENV !== "production") {
                console.error(e.message);
            }
        }
        return result;
    }
}

export class YelpApiClient extends ApiClient {
    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = configs.YELP_BASE_URL;
    }

    searchBusinesses(query: ApiClientQuery) {
        const searchQueries: YelpSearchQuery = {
            term: query.term,
            type: "restaurants",
            sort_by: "best_match",
            location: query.location, // TODO: LOCATION REQUIRED
            limit: 50,
        };

        const headers = {
            "Authorization": `Bearer ${configs.YELP_API_KEY}`,
        };

        const options: OptionsWithUri = {
            uri: `${this.baseUrl}/businesses/search`,
            method: "get",
            headers: headers,
            qs: searchQueries,
            json: true,
        };

        return this.makeCall(options);
    }

    searchOneBusniness(id: string) {
        const headers = {
            "Authorization": `Bearer ${configs.YELP_API_KEY}`,
        };

        const options: OptionsWithUri = {
            uri: `${this.baseUrl}/businesses/${id}`,
            method: "get",
            headers: headers,
            json: true,
        };

        return this.makeCall(options);
    }

    saveYelpData(data: any) {
        const self: YelpApiClient  = this;

        Data.findOneAndUpdate(
            {
                ext_id: data.id,
                source: "yelp",
            },
            {
                ext_id: data.id,
                raw_data: data,
                source: "yelp",
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            },
            function (err, doc) {
                if (err) {
                    console.error(err);
                }

                console.log("yelp data saved!", doc == undefined);
                if (doc !== null) {
                    let name: string;
                    let coords = {};

                    const rawData = data;

                    name = rawData.name;
                    coords = rawData.location;

                    const transactions: string[] = rawData.transactions;
                    let reservation: string[] = [];
                    if (_.includes(transactions, "restaurant_reservation")) {
                        reservation = ["yelp"];
                    }

                    Restaurants.findOneAndUpdate(
                        {
                            name: name,
                            location: coords,
                        },
                        {
                            name: name,
                            alias: rawData.name,
                            categories: rawData.categories,
                            coordinates: rawData.coordinates,
                            location: rawData.location,
                            display_address: rawData.location.display_address,
                            phone_number: rawData.phone,
                            reservation: reservation,
                            source_data: [doc._id],
                        },
                        {
                            new: true,
                            upsert: true,
                            setDefaultsOnInsert: true,
                        },
                        function (err, doc) {
                            if (err) {
                                console.error(err);
                            }
                            console.log("restaurant data saved!");
                        }
                    );
                }
            }
        );
    }
}