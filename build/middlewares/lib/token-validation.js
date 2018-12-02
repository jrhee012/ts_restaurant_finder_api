"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var config_1 = __importDefault(require("../../config"));
exports.default = (function (req, res, next) {
    if (typeof req.headers.token === "string") {
        var token = req.headers.token;
        if (token === config_1.default.TOKEN) {
            return next();
        }
    }
    return res.status(401)
        .json(utils_1.responseBuilder.unauthorized_error());
});
//# sourceMappingURL=token-validation.js.map