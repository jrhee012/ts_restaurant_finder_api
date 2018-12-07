"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../../../controllers/api/users");
var router = express_1.Router();
router.get("/", users_1.getAll);
router.get("/:userId", users_1.getOne);
exports.default = router;
//# sourceMappingURL=users.js.map