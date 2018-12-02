"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TicketTransactionsSchema = new mongoose_1.Schema({
    seller_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    buyer_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    transaction_time: {
        type: Date,
        required: true,
        default: new Date(),
    },
});
mongoose_1.model("TicketTransactions", TicketTransactionsSchema);
//# sourceMappingURL=TicketTransactions.js.map