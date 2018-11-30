import mongoose, { Query, DocumentQuery, Document } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
// import { any } from "bluebird";
// const isEmpty = require('lodash/isEmpty');
// const find = require('lodash/find');

const { Schema } = mongoose;

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
    twitter?: {
        id?: string,
        token?: string,
        displayName?: string,
        username?: string,
    };
    google?: {
        id?: string,
        token?: string,
        email?: string,
        name?: any,
        full_profile?: any,
    };
    instagram?: {
        id?: string,
        token?: string,
        username?: string,
        full_name?: string,
        profile_picture?: any,
    };
    created_at: string;
    last_login_at?: string;
    active?: boolean;
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
    // roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles", index: true }],
    // histories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Saves", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_login_at: Date,
    active: {
        type: Boolean,
        default: true,
    },
});

// middleware
// prints local attr after save
// UsersSchema.post('save', function (doc, next) {
//     let local = this.local;
//     console.log('this:', this);
//     console.log('this.local:', local);
//     next();
// });

// UsersSchema.pre('update', function () {
//     this.update({}, { $set: { last_login_at: new Date() } });
// });

// UsersSchema.post('init', async function () {
//     let roles = await Roles.find({});
//     let userRole = find(roles, { name: 'user' });
//     this.roles = [userRole._id];
//     console.log('aaa', this);
// });

// UsersSchema.pre('validate', function () {
//     this.last_login_at = new Date().toISOString();
// });

// UsersSchema.pre('save', function () {
//     this.test = 'test!';
//     console.log('this: ', this);
//     // next();
// });

UsersSchema.methods.setPassword = function (password: string) {
    this.local.salt = crypto.randomBytes(16).toString("hex");
    this.local.hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        "sha512",
    ).toString("hex");
};

UsersSchema.methods.validatePassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        "sha512"
    ).toString("hex");
    return this.local.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.local.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, "secret");
};

UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.local.email,
        token: this.generateJWT(),
    };
};

mongoose.model("Users", UsersSchema);
