"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import api from "./lib/api";
var restaurants_1 = __importDefault(require("./lib/restaurants"));
var config_1 = __importDefault(require("../config"));
var baseUrl = config_1.default.BASE_URL;
var router;
router = express_1.Router();
router.use(baseUrl + "/restaurants", restaurants_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map