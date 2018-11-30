"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Load all model schema
require("./lib/Data");
require("./lib/Restaurants");
require("./lib/Users");
require("./lib/Roles");
require("./lib/Permissions");
exports.Data = mongoose_1.model("Data");
exports.Restaurants = mongoose_1.model("Restaurants");
exports.Users = mongoose_1.model("Users");
exports.Roles = mongoose_1.model("Roles");
exports.Permissions = mongoose_1.model("Permissions");
//# sourceMappingURL=index.js.map