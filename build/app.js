"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var config_1 = __importDefault(require("./config"));
// import { redisClient } from "./utils";
// require("./models/Data");
// require("./models/Restaurants");
// redisClient.onConnect();
// console.log(redisClient);
require("./models/Restaurants");
require("./models/Data");
var port = config_1.default.PORT;
server_1.default.listen(port);
console.log("Server started on: " + port);
//# sourceMappingURL=app.js.map