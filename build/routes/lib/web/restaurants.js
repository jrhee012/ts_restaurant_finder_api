"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurants_1 = require("../../../controllers/web/restaurants");
var passport_1 = require("../../../config/passport");
var router = express_1.Router();
router.get("/", passport_1.isAuthenticated, restaurants_1.getAll);
exports.default = router;
//# sourceMappingURL=restaurants.js.map