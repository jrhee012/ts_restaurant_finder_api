// import { includes } from "lodash";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import configs from "../../config";
import path from "path";
import { Restaurants, Data } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";
import { __ROOT__ } from "../../app";

export interface ISearchSuggestionBuilder {
    data?: RestaurantsModel[];
    transformed: {
        name: string,
        address: string,
        category: string[],
    }[];
    file_location?: string;
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
    file_location?: string;

    constructor() {
        this.data = undefined;
        this.file_location = undefined;
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

            const id: string = d._id.toString();
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
                const entry = {
                    id: id,
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
            buildDir = "build/public";
        } else {
            buildDir = "src/server/public";
        }
        const fileDir: string = path.resolve(`./${buildDir}/data/search-suggestions`);

        // TODO: save multiple files?
        this.file_location = `${fileDir}/data.json`;

        console.log(data);
        try {
            if (!existsSync(fileDir)) {
                mkdirSync(fileDir, { recursive: true });
            }
            writeFileSync(
                this.file_location,
                JSON.stringify(data),
                { flag: "w", encoding: "utf8" }
            );
            console.log("File created!", data.length);
        } catch (e) {
            console.log("ERROR - CANNOT CREATE FILE!");
            console.error(e);
        }
    }
}

const builder = new SearchSuggestionBuilder();

console.log("> STARTING SUGGESTION BUILDER SAVE LIST");
(async () => await builder.saveList())();
setInterval(async () => {
    console.log("> STARTING SUGGESTION BUILDER SAVE LIST");
    await builder.saveList();
    console.log("> COMPLETED SUGGESTION BUILDER SAVE LIST");
}, 30 * 60 * 1000);

export const suggestionBuilder  = builder;
