import rp, { Options, OptionsWithUri, OptionsWithUrl } from "request-promise";
import _ from "lodash";
import configs from "../../config";
import { Data, Restaurants } from "../../models";
import { DataModel } from "../../models/Data";
import { Restaurant } from "../../models/Restaurants";

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

    // setHttpOptions(options: OptionsWithUri) {
    //     let validation = false;
    //     try {
    //         validation = this._validateHttpOptions(options);
    //     } catch (e) {
    //         console.log("yelp api client validate http options error:");
    //         console.error(e);
    //     }

    //     if (validation) {
    //         this.httpOptions = options;
    //         console.log("http options updated");
    //     } else {
    //         console.log(`cannot set http options with: ${JSON.stringify(options)}`);
    //     }
    // }

    _validateHttpOptions(options: OptionsWithUri) {
        // TODO: UPDATE VALIDATIONS
        if (typeof options !== "object") return false;
        return true;
    }

    async makeCall(httpOptions: OptionsWithUri) {
        // if (_.isEmpty(httpOptions)
        // && !_.isEmpty(this.httpOptions)) {
        //     // console.log("http")
        //     httpOptions = this.httpOptions;
        // }

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

        let result = {};
        try {
            result = await rp(httpOptions);
        } catch (e) {
            console.log("API CALL ERROR:");
            console.error(e.message);
            // result = {};
        }

        return result;
    }

    // findAndUpdateRestaurant(data: DataModel) {
    //     // console.log('db interface data: ', data);
    //     if (data === null || data === undefined) {
    //         return;
    //     }

    //     let name: string;
    //     let coordinates: {
    //         latitude: number,
    //         longitude: number
    //     };
    //     const source = data.source;
    //     if (source === "yelp") {
    //         const rawData = data.raw_data;
    //         // console.log('rawqwwwwww: ', rawData);
    //         name = rawData.name;
    //         coordinates = rawData.coordinates;

    //         Restaurants.findOneAndUpdate(
    //             {
    //                 name: name,
    //                 location: location,
    //             },
    //             {
    //                 name: name,
    //                 alias: rawData.name,
    //                 categories: rawData.categories,
    //                 coordinates: rawData.coordinates,
    //                 location: rawData.location,
    //                 display_address: rawData.location.display_address,
    //                 phone_number: rawData.phone,
    //                 reservation: ["yelp"],
    //                 source_data: [data._id],
    //             },
    //             {
    //                 new: true,
    //                 upsert: true,
    //                 setDefaultsOnInsert: true,
    //             },
    //             function (err, doc) {
    //                 if (err) {
    //                     console.error(err);
    //                 } else {
    //                     console.log("restaurant data saved!");
    //                 }
    //             }
    //         );
    //     }
    // }
}

export class YelpApiClient extends ApiClient {
    // httpOptions: OptionsWithUri;
    baseUrl: string;

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
                            reservation: ["yelp"],
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