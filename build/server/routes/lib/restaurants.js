"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurants_controllers_1 = require("../../controllers/restaurants-controllers");
var router;
router = express_1.Router();
router.get("/", restaurants_controllers_1.index);
exports.default = router;
//# sourceMappingURL=restaurants.js.map