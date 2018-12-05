"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurants_1 = __importDefault(require("./restaurants"));
var data_1 = __importDefault(require("./data"));
var router = express_1.Router();
router.use("/restaurants", restaurants_1.default);
router.use("/data", data_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map