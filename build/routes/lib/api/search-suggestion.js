"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var search_suggestions_controllers_1 = require("../../../controllers/api/search-suggestions-controllers");
var router = express_1.Router();
router.get("/download", search_suggestions_controllers_1.downloadSuggestions);
exports.default = router;
//# sourceMappingURL=search-suggestion.js.map