"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Load all model schema
require("./Data");
require("./Restaurants");
exports.Data = mongoose_1.model("Data");
exports.Restaurants = mongoose_1.model("Restaurants");
//# sourceMappingURL=index.js.map