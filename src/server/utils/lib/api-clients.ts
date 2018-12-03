import rp, { OptionsWithUri } from "request-promise";
import _ from "lodash";
import puppeteer from "puppeteer";
import $ from "cheerio";
import configs from "../../config";
import { Data, Restaurants } from "../../models";

enum OpentableQueryKey {
    dataTime = "dataTime",
    latitude = "latitude",
    longitude = "longitude",
    metroId = "metroId",
    term = "term",
    includeTicketedAvailability = "includeTicketedAvailability",
    pageType = "pageType",
}

export interface OpenTableClientQuery {
    dataTime?: string;
    latitude?: number | string;
    longitude?: number | string;
    metroId?: string | number;
    term: string;
    includeTicketedAvailability?: boolean | string;
    pageType?: number | string;
    [key: string]: string | boolean | number | undefined;
}

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

    constructor() { }

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

export class OpenTableClient extends ApiClient {
    baseUrl: string;
    query: string | undefined;

    constructor() {
        super();
        this.baseUrl = "https://www.opentable.com";
        this.query = undefined;
    }

    setQuery(queries: OpenTableClientQuery) {
        let result: string = "?";
        for (const key in queries) {
            result += `${key}=${queries[key]}&`;
        }
        this.query = result;
    }

    updateQuery(key: OpentableQueryKey, value: string) {
        const queries: string = this.query || "";
        const startIndex: number = queries.indexOf(key);
        const endIndex: number = queries.substring(startIndex).indexOf("&") + queries.substring(0, startIndex).length;

        const oldQuery: string = queries.substring(startIndex, endIndex);

        const queryArr: string[] = oldQuery.split("=");
        queryArr[1] = value;

        const newQuery: string = _.join(queryArr, "=");

        this.query = queries.substring(0, startIndex) + newQuery + queries.substring(endIndex);
    }
}
