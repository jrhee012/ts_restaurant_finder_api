"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var restaurants_1 = __importDefault(require("./restaurants"));
var data_1 = __importDefault(require("./data"));
var search_suggestion_1 = __importDefault(require("./search-suggestion"));
var users_1 = __importDefault(require("./users"));
var router = express_1.Router();
router.use("/restaurants", restaurants_1.default);
router.use("/data", data_1.default);
router.use("/search_suggestions", search_suggestion_1.default);
router.use("/users", users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map