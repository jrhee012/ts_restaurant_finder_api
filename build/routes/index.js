"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var restaurants_1 = __importDefault(require("./lib/api/restaurants"));
var data_1 = __importDefault(require("./lib/api/data"));
var config_1 = __importDefault(require("../config"));
var profile_1 = __importDefault(require("./lib/web/profile"));
var restaurants_2 = __importDefault(require("./lib/web/restaurants"));
var login_1 = require("../controllers/web/login");
var ApiBaseUrl = config_1.default.BASE_URL;
var router;
router = express_1.Router();
router.get("/", function (req, res) {
    var data = { user: res.locals.user };
    // console.log('session', req.session)
    return res.status(200).render("pages/home", data);
});
router.use("/profile", profile_1.default);
router.use("/restaurants", restaurants_2.default);
// LOGIN ============================================================
router.get("/login/facebook", function (req, res) { return res.redirect("/auth/facebook"); });
router.get("/login/google", function (req, res) { return res.redirect("/auth/google"); });
router.get("/login", login_1.getLogin);
router.post("/login", passport_1.default.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}));
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
router.get("/signup", login_1.getSignUp);
router.post("/signup", passport_1.default.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
}));
// GOOGLE AUTH
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}), function (req, res) {
    // console.log("!!!!!")
    return res.send(200);
});
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile"],
}));
// facebook
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    console.log("!!!!!");
    return res.redirect("/profile");
});
router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
// API===============================================================
router.use(ApiBaseUrl + "/restaurants", restaurants_1.default);
router.use(ApiBaseUrl + "/data", data_1.default);
// EASTER EGGGGGSSSS
router.get("/jen", function (req, res) {
    return res.status(200).send("i love you, jen <3");
});
exports.default = router;
//# sourceMappingURL=index.js.map