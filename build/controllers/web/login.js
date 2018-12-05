"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
exports.getLogin = function (req, res) {
    var alerts = utils_1.setAlerts(req);
    var data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success
    };
    return res.status(200).render("pages/login/login", data);
};
exports.getSignUp = function (req, res) {
    var alerts = utils_1.setAlerts(req);
    var data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success
    };
    return res.status(200).render("pages/login/signup", data);
};
//# sourceMappingURL=login.js.map