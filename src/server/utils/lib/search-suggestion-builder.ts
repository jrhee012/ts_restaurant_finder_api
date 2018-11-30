import { includes } from "lodash";
import { Restaurants } from "../../models";
import { RestaurantsModel } from "../../models/lib/Restaurants";

export interface ISearchSuggestionBuilder {
    data: RestaurantsModel[];
}

export interface ISearchSuggestionBuilderModel extends ISearchSuggestionBuilder, Document {
    updateData: () => Promise<RestaurantsModel[]>;
}

class SearchSuggestionBuilder {
    data: RestaurantsModel[];
    transformed: {
        name: string,
        address: string,
        category: string[],
    }[];

    constructor(data: RestaurantsModel[]) {
        this.data = data;
        this.transformed = [];
    }

    async updateData() {
        let new_data: RestaurantsModel[];
        try {
            new_data = await Restaurants.find();
        } catch (e) {
            console.log("ERROR search suggestion builder update data method");
            console.error(e);
            new_data = [];
        }

        if (new_data.length > 0) {
            this.data = new_data;
        }

        return new_data;
    }

    createList(data: RestaurantsModel[]) {
        const list: {
            name: string,
            address: string,
            category: string[],
        }[] = [];
        data.forEach((d: RestaurantsModel) => {
            const source = d.source_data;

            let name: string | undefined = undefined;
            let address: string | undefined = undefined;
            const category: string[] = [];

            if (includes(source, "yelp")) {
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
        });
        this.transformed = list;
    }
}
