"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var LikesSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    restaurant_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Restaurants",
        index: true,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});
LikesSchema.pre("validate", function () {
    var doc = this;
    doc.last_updated = new Date().toISOString();
});
mongoose_1.model("Likes", LikesSchema);
//# sourceMappingURL=Likes.js.map