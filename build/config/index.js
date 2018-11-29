"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var Config = /** @class */ (function () {
    function Config() {
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;
        this.MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/ts_rest_finder_api";
        this.BASE_URL = "/api/v1";
    }
    return Config;
}());
var configs;
configs = new Config();
exports.default = configs;
//# sourceMappingURL=index.js.map