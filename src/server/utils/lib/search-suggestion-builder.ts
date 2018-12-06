import { includes } from "lodash";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import configs from "../../config";
import path from "path";
import { Restaurants, Data } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";
import { DataModel } from "../../models/lib/Data";
import { __ROOT__ } from "../../app";
import { DocumentQuery } from "mongoose";
// import { redisClient } from "./redis";

// const cacheKey: string = "SearchSuggestionBuilder";

export interface ISearchSuggestionBuilder {
    data?: RestaurantsModel[];
    transformed: {
        name: string,
        address: string,
        category: string[],
    }[];
}

interface ISearchSuggestionBuilderModel extends ISearchSuggestionBuilder, Document {
    getData: () => Promise<RestaurantsModel[]>;
    createList: () => void;
    getList: () => {
        name: string;
        address: string;
        category: string[];
    }[];
    saveList: () => Promise<void>;
}

class SearchSuggestionBuilder {
    data?: RestaurantsModel[];
    transformed: {
        name: string,
        address: string,
        category: string[],
    }[];

    constructor() {
        this.data = undefined;
        this.transformed = [];
    }

    private async getData() {
        let new_data: RestaurantsModel[];
        try {
            new_data = await Restaurants.find();
        } catch (e) {
            console.log("ERROR search suggestion builder update data method");
            console.error(e.message);
            new_data = [];
        }

        if (new_data.length > 0) {
            this.data = new_data;
        }

        return new_data;
    }

    private async createList(data: RestaurantsModel[]) {
        const list: {
            name: string,
            address: string,
            category: string[],
        }[] = [];

        for (let i = 0; i < data.length; i++) {
        // data.forEach(async (d: RestaurantsModel) => {
            const d = data[i];
            const source = d.source_data;

            let name: string | undefined = undefined;
            let address: string | undefined = undefined;
            const category: string[] = [];

            const promiseAllArr: any[] = [];
            for (let i = 0; i < source.length; i++) {
                const query = Data.findById(source[i]);
                promiseAllArr.push(query);
            }
            const promiseAll = new Set(promiseAllArr);
            const rawData = await Promise.all(promiseAll);
            let check: boolean = false;

            // TODO: better logic for multiple sources
            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i].source === "yelp") {
                    check = true;
                    break;
                }
            }

            console.log("check...", check);

            if (check) {
                name = d.name;
                let address_str: string = "";
                for (let i = 0; i < d.display_address.length; i++) {
                    if (i == d.display_address.length - 1) {
                        address_str += d.display_address[i];
                    } else {
                        address_str += `${d.display_address[i]}, `;
                    }
                }
                address = address_str;
                for (let j = 0; j < d.categories.length; j++) {
                    const name: string = d.categories[j].title;
                    category.push(name);
                }
            }

            if (name !== undefined && address !== undefined) {
                const entry: {
                    name: string,
                    address: string,
                    category: string[],
                } = {
                    name: name,
                    address: address,
                    category: category,
                };
                list.push(entry);
            }
        }
        this.transformed = list;
    }

    async getList() {
        const data: RestaurantsModel[] = await this.getData();
        await this.createList(data);
        return this.transformed;
    }

    async saveList() {
        let data: ISearchSuggestionBuilder["transformed"] = this.transformed;

        if (data.length < 1) {
            data = await this.getList();
        }

        let buildDir: string;
        if (configs.NODE_ENV === "production") {
            buildDir = "build";
        } else {
            buildDir = "src/server";
        }

        const fileDir: string = path.resolve(`./${buildDir}/data/search-suggestions`);

        if (!existsSync(fileDir)) {
            mkdirSync(fileDir, { recursive: true });
        }

        writeFileSync(
            `${fileDir}/data.json`,
            JSON.stringify(data),
            { flag: "w", encoding: "utf-8" }
        );
        console.log("File created!");
    }
}

const builder = new SearchSuggestionBuilder();
(async () => builder.saveList())();
export const suggestionBuilder  = builder;
