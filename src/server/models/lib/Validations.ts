import {
    Schema,
    model,
    Document,
    HookNextFunction
} from "mongoose";
import uuidv4 from "uuid/v4";
import logger from "../../config/logger";

export interface IValidations {
    user_id: string;
    validated: true;
    url: string;
    expires_at: string;
    created_at: string;
    last_updated: string;
}

export interface ValidationsModel extends Document, IValidations {
    setExpireDate: () => void;
    completeValidation: () => void;
    createNew: (userId: string) => Promise<void>;
}

const ValidationsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        index: true,
        required: true,
    },
    validated: {
        type: Boolean,
        required: true,
        default: false,
    },
    url: {
        type: String,
        required: true,
    },
    expires_at: Date,
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

ValidationsSchema.pre("validate", function(next: HookNextFunction) {
    const doc = <ValidationsModel>this;
    doc.last_updated = new Date().toISOString();
    if (doc.expires_at === undefined) {
        doc.setExpireDate();
    }
    next();
});

ValidationsSchema.methods.setExpireDate = function() {
    this.last_updated = new Date().toISOString();
    if (this.expires_at === undefined) {
        const createdDate = new Date(this.created_at);
        const expireDate = createdDate.setDate(createdDate.getDate() + 7);
        this.expires_at = new Date(expireDate).toISOString();
    }
};

ValidationsSchema.methods.completeValidation = async function() {
    const vChcek = this.validated;
    if (!vChcek) {
        this.validated = true;
        try {
            await this.save();
        } catch (e) {
            logger.error("ERROR validation model complete validation method");
            logger.error(`VALIDATION ENTRY: ${this}`);
            logger.error(e.message);
            throw new Error(e.message);
        }
    }
    return;
};

ValidationsSchema.methods.createNew = async function(userId: string) {
    this.user_id = userId;
    this.url = `/profile/validate/${uuidv4()}`;
    this.setExpireDate();
    this.save();
};

model("Validations", ValidationsSchema);
