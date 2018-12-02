import { Document, Schema, model } from "mongoose";

export interface IAdmin {
    user_id: string;
    active: true;
    created_at: string;
    last_updated: string;
}

export interface AdminsModel extends Document, IAdmin { }

const AdminsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
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

AdminsSchema.pre("validate", async function (next) {
    const doc = <AdminsModel>this;
    doc.last_updated = new Date().toISOString();
    next();
});

model("Admins", AdminsSchema);
