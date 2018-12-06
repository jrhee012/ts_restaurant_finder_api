import { Document, Schema, model } from "mongoose";

export interface ILike {
    user_id: string;
    restaurant_id: string;
    active: boolean;
    created_at: string;
    last_updated: string;
}

export interface LikesModel extends Document, ILike { }

const LikesSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
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
    const doc = <LikesModel>this;
    doc.last_updated = new Date().toISOString();
});

model("Likes", LikesSchema);
