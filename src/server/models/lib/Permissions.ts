import { Document, Schema, Query, Model, model } from "mongoose";

export interface IPermission {
    name: string;
    created_at: string;
    last_updated: string;
}

export interface PermissionsModel extends Document, IPermission { }

const PermissionsSchema = new Schema({
    name: String,
    // scopes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

model("Permissions", PermissionsSchema);
