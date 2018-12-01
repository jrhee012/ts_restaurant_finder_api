import { Schema, model, Document } from "mongoose";

export interface ITickets {
    user_id: string;
    restaurant_id: string;
    time: string;
    active: boolean;
    created_at: string;
    last_updated: string;
}

export interface TicketsModel extends Document, ITickets { }

const TicketsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
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
    const doc = <TicketsModel>this;
    doc.last_updated = new Date().toISOString();
});

model("Tickets", TicketsSchema);
