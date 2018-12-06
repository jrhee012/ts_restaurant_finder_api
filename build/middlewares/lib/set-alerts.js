"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
exports.default = (function (req, res, next) {
    var alerts = utils_1.setAlerts(req);
    res.locals.alerts = alerts;
    next();
});
//# sourceMappingURL=set-alerts.js.map