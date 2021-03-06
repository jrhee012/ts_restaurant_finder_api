import { Document, Schema, model } from "mongoose";

export interface RestaurantsModel extends Document {
    name: string;
    alias: string;
    categories: any;
    coordinates: any;
    location: any;
    display_address: any;
    phone_number: string;
    website: string;
    reservation: any[];
    description: any;
    source_data: any[];
    created_at: string;
    last_updated: string;
}

const RestaurantsSchema = new Schema({
    name: String,
    alias: String,
    categories: Schema.Types.Mixed,
    coordinates: Schema.Types.Mixed,
    location: Schema.Types.Mixed,
    display_address: Schema.Types.Mixed,
    phone_number: String,
    website: String,
    reservation: [Schema.Types.Mixed],
    description: Schema.Types.Mixed,
    source_data: [{
        type: Schema.Types.ObjectId,
        ref: "Data",
        index: true
    }],
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
    last_updated: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

RestaurantsSchema.pre("validate", function () {
    const doc = <RestaurantsModel>this;
    doc.last_updated = new Date().toISOString();
});

model("Restaurants", RestaurantsSchema);
