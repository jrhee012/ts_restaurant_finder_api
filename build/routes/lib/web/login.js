"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var login_1 = require("../../../controllers/web/login");
var router = express_1.Router();
router.get("/login/facebook", function (req, res) { return res.redirect("/auth/facebook"); });
router.get("/login/google", function (req, res) { return res.redirect("/auth/google"); });
router.get("/login", login_1.getLogin);
router.post("/login", passport_1.default.authenticate("local", {
    // successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}), function (req, res) {
    if (req.originalUrl === "/login") {
        return res.redirect("/profile");
    }
    return res.redirect(req.originalUrl);
});
router.get("/logout", function (req, res) {
    // req.logout();
    // res.redirect("/");
    var success = ["Log out success!"];
    var data = { user: undefined, success: success, alert: [] };
    return res.status(200).render("pages/home", data);
});
router.get("/signup", login_1.getSignUp);
router.post("/signup", passport_1.default.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
}));
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    // successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}), function (req, res) { return res.redirect("/"); });
router.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile"],
}));
// facebook
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) { return res.redirect("/profile"); });
router.get("/auth/facebook", passport_1.default.authenticate("facebook"));
exports.default = router;
//# sourceMappingURL=login.js.map