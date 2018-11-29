"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_controllers_1 = require("../../controllers/data-controllers");
var router = express_1.Router();
router.get("/search", data_controllers_1.searchAndCreate);
exports.default = router;
//# sourceMappingURL=data.js.map