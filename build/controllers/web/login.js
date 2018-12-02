"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogin = function (req, res) {
    console.log("login page!");
    // console.log(req.flash("error"));
    var flash = req.flash("error");
    var data = { user: res.locals.user, alert: flash };
    return res.status(200).render("pages/login/login", data);
};
exports.getSignUp = function (req, res) {
    console.log("sign up page!");
    var flash = req.flash("error");
    var data = { user: res.locals.user, alert: flash };
    return res.status(200).render("pages/login/signup", data);
};
//# sourceMappingURL=login.js.map