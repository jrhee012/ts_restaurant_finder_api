"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var Config = /** @class */ (function () {
    function Config() {
        this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;
        this.MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/ts_rest_finder_api";
        this.REDIS_URL = process.env.REDIS_URL ? process.env.REDIS_URL : "redis://localhost:6379";
        this.CACHE_TTL = 900;
        this.BASE_URL = "/api/v1";
        this.TOKEN = process.env.TOKEN ? process.env.TOKEN : "";
        this.YELP_BASE_URL = process.env.YELP_BASE_URL ? process.env.YELP_BASE_URL : "https://api.yelp.com/v3";
        this.YELP_API_KEY = process.env.YELP_API_KEY ? process.env.YELP_API_KEY : "";
        this.YELP_CLIENT_ID = process.env.YELP_CLIENT_ID ? process.env.YELP_CLIENT_ID : "";
    }
    return Config;
}());
var configs;
configs = new Config();
exports.default = configs;
//# sourceMappingURL=index.js.map