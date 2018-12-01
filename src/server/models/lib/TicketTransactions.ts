import { Schema, model, Document } from "mongoose";

export interface ITicketTranscations {
    seller_id: string;
    buyer_id: string;
    transaction_time: string;
}

export interface TicketTransactionsModel extends Document, ITicketTranscations { }

const TicketTransactionsSchema = new Schema({
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    buyer_id: {
        type: Schema.Types.ObjectId,
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

model("TicketTransactions", TicketTransactionsSchema);
