"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthenticated = function (req, res, next) {
    var user = res.locals.user;
    if (user === undefined || user === null) {
        return res.redirect("/");
    }
    if (!user.authenticated) {
        return res.redirect("/");
    }
    next();
};
//# sourceMappingURL=authentication.js.map