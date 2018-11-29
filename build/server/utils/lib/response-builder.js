"use strict";
// import request = require("request");
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder() {
        this.name = "Response Builder";
    }
    ResponseBuilder.prototype.internal_server_error = function () {
        var response = {
            code: 500,
            message: "Internal Server Error",
            data: {},
        };
        return response;
    };
    return ResponseBuilder;
}());
var responseBuilder = new ResponseBuilder();
exports.default = responseBuilder;
//# sourceMappingURL=response-builder.js.map