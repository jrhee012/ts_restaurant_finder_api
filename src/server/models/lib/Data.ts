import { Document, Schema, model } from "mongoose";

export interface DataModel extends Document {
    raw_data: any;
    source: string;
    ext_id: string;
    created_at?: string;
    last_updated?: string;
}

const DataSchema = new Schema({
    raw_data: Schema.Types.Mixed,
    source: String,
    ext_id: String,
    created_at: {
        type: Date,
        required: true,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        required: true,
        default: new Date().toISOString(),
    },
});

DataSchema.pre("validate", function () {
    const doc = <DataModel>this;
    doc.last_updated = new Date().toISOString();
});

model("Data", DataSchema);
