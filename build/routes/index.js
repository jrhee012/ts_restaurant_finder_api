"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = __importDefault(require("../config"));
var passport_1 = require("../config/passport");
var middlewares_1 = require("../middlewares");
// ADMIN ROUTERS
var admin_1 = __importDefault(require("./lib/admin"));
// API ROUTERS
var api_1 = __importDefault(require("./lib/api"));
// LOGIN ROUTERS
var login_1 = __importDefault(require("./lib/web/login"));
// WEB ROUTERS
var web_1 = __importDefault(require("./lib/web"));
var ApiBaseUrl = config_1.default.API_BASE_URL;
var router = express_1.Router();
// API
router.use("" + ApiBaseUrl, middlewares_1.tokenValidation, api_1.default);
// ADMIN
router.use("/admin", passport_1.isAuthenticated, passport_1.isAdmin, admin_1.default);
// LOGIN
router.use("/", middlewares_1.setAlerts, login_1.default);
// WEB
router.get("/", middlewares_1.setAlerts, function (req, res) {
    var alerts = res.locals.alerts;
    var data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success,
    };
    return res.status(200).render("pages/home", data);
});
router.use("/", passport_1.isAuthenticated, middlewares_1.setAlerts, web_1.default);
// EASTER EGGGGS
router.get("/jen", function (req, res) {
    return res.status(200).send("i love you, jen <3");
});
exports.default = router;
//# sourceMappingURL=index.js.map