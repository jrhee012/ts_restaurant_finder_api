"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Load all model schema
require("./lib/Data");
require("./lib/Restaurants");
require("./lib/Users");
require("./lib/Roles");
require("./lib/Permissions");
require("./lib/TicketTransactions");
require("./lib/Tickets");
require("./lib/Admins");
require("./lib/Validations");
require("./lib/Likes");
exports.Data = mongoose_1.model("Data");
exports.Restaurants = mongoose_1.model("Restaurants");
exports.Users = mongoose_1.model("Users");
exports.Roles = mongoose_1.model("Roles");
exports.Permissions = mongoose_1.model("Permissions");
exports.Tickets = mongoose_1.model("Tickets");
exports.TicketTransactions = mongoose_1.model("TicketTransactions");
exports.Admins = mongoose_1.model("Admins");
exports.Validations = mongoose_1.model("Validations");
exports.Likes = mongoose_1.model("Likes");
//# sourceMappingURL=index.js.map