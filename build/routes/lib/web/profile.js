"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_1 = require("../../../controllers/web/profile");
var router = express_1.Router();
router.get("/", profile_1.getProfile);
router.post("/authenticate", profile_1.postAuthenticationPage);
router.get("/validate/:validationId", profile_1.finishValidation);
exports.default = router;
//# sourceMappingURL=profile.js.map