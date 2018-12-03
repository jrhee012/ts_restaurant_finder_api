"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurants_1 = require("../../../controllers/web/restaurants");
var router = express_1.Router();
router.get("/", restaurants_1.getAll);
router.get("/:restaurantId", restaurants_1.getOne);
exports.default = router;
//# sourceMappingURL=restaurants.js.map