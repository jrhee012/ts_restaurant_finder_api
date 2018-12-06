"use strict";
// import request = require("request");
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBuilder = /** @class */ (function () {
    // name: string;
    function ResponseBuilder() {
        // this.name = "Response Builder";
    }
    ResponseBuilder.prototype.internal_server_error = function (data) {
        var response = {
            code: 500,
            message: "Internal Server Error",
            data: data ? data : {},
        };
        return response;
    };
    ResponseBuilder.prototype.unauthorized_error = function (data) {
        var response = {
            code: 401,
            message: "Unauthorized",
            data: data ? data : {},
        };
        return response;
    };
    ResponseBuilder.prototype.not_found_error = function (data) {
        var response = {
            code: 404,
            message: "Not Found",
            data: data ? data : {},
        };
        return response;
    };
    ResponseBuilder.prototype.api_success = function (data) {
        var response = {
            code: 200,
            message: "ok",
            data: data ? data : {},
        };
        return response;
    };
    return ResponseBuilder;
}());
var responseBuilder = new ResponseBuilder();
exports.default = responseBuilder;
//# sourceMappingURL=response-builder.js.map