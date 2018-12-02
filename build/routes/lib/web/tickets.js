"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tickets_1 = require("../../../controllers/web/tickets");
var router = express_1.Router();
router.get("/", tickets_1.getAll);
exports.default = router;
//# sourceMappingURL=tickets.js.map