import { Schema, model, Document, HookNextFunction } from "mongoose";

export interface IValidations {
    user_id: string;
    url: string;
    expires_at?: string;
    created_at: string;
    last_updated: string;
}

export interface ValidationsModel extends Document, IValidations {
    setExpireDate: () => void;
}

const ValidationsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    expires_at: String,
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

ValidationsSchema.pre("validate", function(next: HookNextFunction) {
    const doc = <ValidationsModel>this;
    doc.last_updated = new Date().toISOString();
    if (doc.expires_at === undefined) {
        doc.setExpireDate();
    }
    next();
});

ValidationsSchema.methods.setExpireDate = function () {
    this.last_updated = new Date().toISOString();
    if (this.expires_at === undefined) {
        const createdDate = new Date(this.created_at);
        const expireDate = createdDate.setDate(createdDate.getDate() + 7);
        this.expires_at = new Date(expireDate).toISOString();
    }
};

model("Validations", ValidationsSchema);
