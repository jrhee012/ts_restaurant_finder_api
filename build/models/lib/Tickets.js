"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TicketsSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        index: true,
    },
    restaurant_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Restaurants",
        index: true,
    },
    time: {
        type: Date,
        required: true,
    },
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
TicketsSchema.pre("validate", function () {
    var doc = this;
    doc.last_updated = new Date().toISOString();
});
mongoose_1.model("Tickets", TicketsSchema);
//# sourceMappingURL=Tickets.js.map