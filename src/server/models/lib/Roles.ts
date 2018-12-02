import { Document, Schema, model } from "mongoose";

export interface IRole {
    name: string;
    scopes: string[];
    created_at: string;
    last_updated: string;
}

export interface RolesModel extends Document, IRole { }

const RolesSchema = new Schema({
    name: String,
    scopes: [{ type: Schema.Types.ObjectId, ref: "Permissions", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

model("Roles", RolesSchema);
