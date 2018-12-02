"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = __importDefault(require("../config"));
var passport_1 = require("../config/passport");
// ADMIN ROUTERS
var admin_1 = __importDefault(require("./lib/admin"));
// API ROUTERS
var api_1 = __importDefault(require("./lib/api"));
// LOGIN ROUTERS
var login_1 = __importDefault(require("./lib/web/login"));
// WEB ROUTERS
var web_1 = __importDefault(require("./lib/web"));
var ApiBaseUrl = config_1.default.BASE_URL;
var router = express_1.Router();
// API
router.use("" + ApiBaseUrl, api_1.default);
// ADMIN
router.use("/admin", passport_1.isAuthenticated, passport_1.isAdmin, admin_1.default);
// LOGIN
router.use("/", login_1.default);
// WEB
router.use("/", passport_1.isAuthenticated, web_1.default);
// EASTER EGGGGS
router.get("/jen", function (req, res) {
    return res.status(200).send("i love you, jen <3");
});
exports.default = router;
//# sourceMappingURL=index.js.map