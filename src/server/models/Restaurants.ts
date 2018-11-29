import { Document, Schema, Query, Model, model } from "mongoose";

// const { Schema } = mongoose;
console.log("aaaa!EFD")
interface Restaurant extends Document {
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
    source_data: string[];
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
    const doc = <Restaurant>this;
    doc.last_updated = new Date().toISOString();
});

// RestaurantsSchema.pre("update", function () {
//     const doc = <Restaurant>this;
//     this.last_updated = new Date().toISOString();
// });

model("Restaurants", RestaurantsSchema);
