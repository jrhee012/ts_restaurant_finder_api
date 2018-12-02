"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_1 = require("../../../controllers/web/profile");
var router = express_1.Router();
router.get("/", profile_1.getProfile);
router.get("/authenticate", profile_1.getAuthenticationPage);
router.post("/authenticate", profile_1.postAuthenticationPage);
exports.default = router;
//# sourceMappingURL=profile.js.map