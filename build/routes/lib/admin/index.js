"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_1 = require("../../../controllers/admin");
var router = express_1.Router();
router.get("/", admin_1.homePage);
exports.default = router;
//# sourceMappingURL=index.js.map