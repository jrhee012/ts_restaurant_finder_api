"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Document } from "mongoose";
var fs_1 = require("fs");
var utils_1 = require("../../utils");
exports.downloadSuggestions = function (req, res) {
    var suggestions = utils_1.suggestionBuilder.transformed;
    try {
        if (suggestions.length < 1
            && utils_1.suggestionBuilder.file_location !== undefined) {
            var fileData = fs_1.readFileSync(utils_1.suggestionBuilder.file_location, { flag: "r", encoding: "utf8" });
            suggestions = JSON.parse(fileData);
        }
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json(utils_1.responseBuilder.internal_server_error());
    }
    if (suggestions.length < 1) {
        return res.status(500).json(utils_1.responseBuilder.not_found_error());
    }
    return res.status(200).json(utils_1.responseBuilder.api_response(suggestions));
};
//# sourceMappingURL=search-suggestions-controllers.js.map