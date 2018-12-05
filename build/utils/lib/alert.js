"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req) {
    var success = req.flash("success");
    var error = req.flash("error");
    return {
        success: success,
        error: error,
    };
});
//# sourceMappingURL=alert.js.map