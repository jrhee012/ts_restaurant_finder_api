"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("./config"));
mongoose_1.default.Promise = global.Promise;
try {
    mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true });
    console.log("mongodb connected on: " + config_1.default.MONGODB_URI);
    if (process.env.NODE_ENV !== "production") {
        mongoose_1.default.set("debug", true);
        console.log("mongoose `debug` set `true`");
    }
}
catch (e) {
    console.log("cannot connect to mongodb on " + config_1.default.MONGODB_URI + "!");
    console.error(e);
    process.exit(1);
}
var server = express_1.default();
server.get("/", function (req, res) { return res.status(200).send("ok"); });
exports.default = server;
//# sourceMappingURL=server.js.map