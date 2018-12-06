"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
// import { __ROOT__ } from "../server";
if (process.env.NODE_ENV !== "production") {
    dotenv_1.config();
}
var Config = /** @class */ (function () {
    function Config() {
        this.NODE_ENV = process.env.NODE_ENV || "dev";
        // this.__ROOT__ = __ROOT__;
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;
        // MongoDB config
        this.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ts_rest_finder_api";
        // Redis config
        this.REDIS_URL = process.env.REDIS_URL || "localhost:6379";
        this.CACHE_TTL = 900;
        // API config
        this.API_BASE_URL = "/api/v1";
        this.TOKEN = process.env.TOKEN || "";
        // Yelp Fusion API config
        this.YELP_BASE_URL = process.env.YELP_BASE_URL || "https://api.yelp.com/v3";
        this.YELP_API_KEY = process.env.YELP_API_KEY || "";
        this.YELP_CLIENT_ID = process.env.YELP_CLIENT_ID || "";
        // Google Api config
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
        this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "";
        // Facebook Api config
        this.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || "";
        this.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || "";
        this.FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL || "";
        this.SESSION_SECRET = process.env.SESSION_SECRET || "bambi";
    }
    return Config;
}());
var configs;
configs = new Config();
exports.default = configs;
//# sourceMappingURL=index.js.map