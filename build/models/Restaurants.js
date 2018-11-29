"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RestaurantsSchema = new mongoose_1.Schema({
    name: String,
    alias: String,
    categories: mongoose_1.Schema.Types.Mixed,
    coordinates: mongoose_1.Schema.Types.Mixed,
    location: mongoose_1.Schema.Types.Mixed,
    display_address: mongoose_1.Schema.Types.Mixed,
    phone_number: String,
    website: String,
    reservation: [mongoose_1.Schema.Types.Mixed],
    description: mongoose_1.Schema.Types.Mixed,
    source_data: [{
            type: mongoose_1.Schema.Types.ObjectId,
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
    var doc = this;
    doc.last_updated = new Date().toISOString();
});
// RestaurantsSchema.pre("update", function () {
//     const doc = <Restaurant>this;
//     this.last_updated = new Date().toISOString();
// });
mongoose_1.model("Restaurants", RestaurantsSchema);
//# sourceMappingURL=Restaurants.js.map