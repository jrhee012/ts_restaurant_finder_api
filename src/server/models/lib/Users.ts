import {
    Document,
    Schema,
    model,
    Error,
    HookNextFunction
} from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import * as EmailValidator from "email-validator";
// import uuidv4 from "uuid/v4";
import { RolesModel } from "./Roles";
import { Roles, Admins, Validations, Likes } from "..";
import { LikesModel } from "./Likes";
// import { ValidationsModel } from "./Validations";
// import { includes } from "lodash";
import logger from "../../config/logger";

export interface IUsers {
    local: {
        email?: string,
        hash?: string,
        salt?: string,
    };
    facebook: {
        id?: string,
        token?: string,
        username?: string,
        displayName?: string,
        name?: any,
        gender?: string,
        profileUrl?: string,
        provider?: string,
        full_profile?: any,
    };
    twitter: {
        id?: string,
        token?: string,
        displayName?: string,
        username?: string,
    };
    google: {
        id?: string,
        token?: string,
        email?: string,
        name?: any,
        full_profile?: any,
    };
    instagram: {
        id?: string,
        token?: string,
        username?: string,
        full_name?: string,
        profile_picture?: any,
    };
    roles: string[];
    created_at: string;
    last_login_at?: string;
    active: boolean;
    authenticated: boolean;
}

export interface UsersModel extends Document, IUsers {
    validatePassword: (password: string) => boolean;
    setPassword: (password: string) => void;
    generateJwt: () => string;
    toAuthJSON: () => {
        id: any,
        username: any,
        token: any,
    };
    isAdmin: () => boolean;
    completeValidation: () => void;
    checkValidation: () => Promise<boolean>;
    getRoles: () => Promise<RolesModel[]>;
    getAllLikes: () => Promise<LikesModel[]>;
}

const UsersSchema = new Schema({
    local: {
        email: String,
        hash: String,
        salt: String,
    },
    facebook: {
        id: String,
        token: String,
        username: String,
        displayName: String,
        name: Schema.Types.Mixed,
        gender: String,
        profileUrl: String,
        provider: String,
        full_profile: Schema.Types.Mixed,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: Schema.Types.Mixed,
        full_profile: Schema.Types.Mixed,
    },
    instagram: {
        id: String,
        token: String,
        username: String,
        full_name: String,
        profile_picture: Schema.Types.Mixed,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Roles", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_login_at: Date,
    active: {
        type: Boolean,
        default: true,
    },
    authenticated: {
        type: Boolean,
        default: false,
    },
});

UsersSchema.pre("validate", async function(next) {
    const doc = <UsersModel>this;
    if (doc.local === undefined || doc.local === null) {
        next();
    }
    if (doc.local.email === undefined || doc.local.email === null) {
        next();
    } else {
        const email: string = doc.local.email;
        const check: boolean = EmailValidator.validate(email);

        if (!check) {
            throw new Error("Invalid Email!");
        }
        next();
    }
});

UsersSchema.pre("save", async function(next: HookNextFunction) {
    const doc = <UsersModel>this;
    const roles = doc.roles || [];

    let userRole: RolesModel | null;
    try {
        userRole = await Roles.findOne({ name: "user" });
        roles.forEach(async role => {
            const find_role = await Roles.findById(role);
            if (find_role !== null && userRole !== null) {
                if (find_role._id.toString() === userRole._id.toString()) {
                    return next();
                } else {
                    roles.push(userRole._id);
                    doc.roles = roles;
                }
            }
        });

        if (roles.length < 1 && userRole !== null) {
            roles.push(userRole._id);
            doc.roles = roles;
        }
    } catch (e) {
        console.error(e.message);
        // return next(e);
        throw new Error(e.message);
    }
    return next();
});

UsersSchema.pre("save", async function(next: HookNextFunction) {
    const doc = <UsersModel>this;
    const existing = await Validations.findOne({ user_id: doc._id });
    if (existing === null || existing === undefined) {
        try {
            const userProfileValidation = new Validations();
            await userProfileValidation.createNew(doc._id);
        } catch (e) {
            console.log("ERROR create new validation for user");
            console.error(e.message);
            throw new Error(e.message);
        }
    }
    return next();
});

UsersSchema.methods.setPassword = function(password: string) {
    this.local.salt = crypto.randomBytes(16).toString("hex");
    this.local.hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        "sha512",
    ).toString("hex");
};

UsersSchema.methods.validatePassword = function(password: string) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        "sha512"
    ).toString("hex");
    return this.local.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.local.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, "secret");
};

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.local.email,
        token: this.generateJWT(),
    };
};

UsersSchema.methods.isAdmin = async function() {
    const admin = await Admins.findOne({ user_id: this._id });
    if (admin === null) {
        return false;
    } else {
        return true;
    }
};

UsersSchema.methods.completeValidation = async function() {
    const validation = await Validations.findOne({ user_id: this._id });

    if (validation !== null) {
        const vChcek = validation.validated;
        if (!vChcek) {
            this.validated = true;
            try {
                await this.save();
            } catch (e) {
                console.log("ERROR validation model complete validation method");
                console.log(`VALIDATION ENTRY: ${this}`);
                console.error(e.message);
                throw new Error(e.message);
            }
        }
    } else {
        console.log(`ERROR no validtion for user id: ${this._id}`);
        throw new Error("Internal Server Error: UsersSchema.completeValidation");
    }

    return;
};

UsersSchema.methods.checkValidation = async function() {
    try {
        const validation = await Validations.findOne({ user_id: this._id });
        if (validation === null || validation === undefined) {
            throw new Error("Internal Server Error: UsersSchema.checkValidation");
        }
        return validation.validated;
    } catch (e) {
        console.log("ERROR UsersSchema.checkValidation");
        console.error(e.message);
        throw new Error(e.message);
    }
};

UsersSchema.methods.getRoles = async function() {
    try {
        const roles: RolesModel[] = [];
        const role_ids = this.roles;
        role_ids.forEach(async (id: string) => {
            const role: RolesModel | null = await Roles.findById(id);
            if (role !== null) {
                roles.push(role);
            }
        });
        return roles;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

UsersSchema.methods.getAllLikes = async function () {
    try {
        const likes = await Likes.find({ user_id: this._id });
        return likes;
    } catch (e) {
        console.error(e.message);
        throw new Error(e.message);
    }
};

model("Users", UsersSchema);
