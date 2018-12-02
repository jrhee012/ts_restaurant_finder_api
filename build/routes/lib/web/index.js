"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("../../../config/passport");
var profile_1 = __importDefault(require("./profile"));
var restaurants_1 = __importDefault(require("./restaurants"));
var tickets_1 = __importDefault(require("./tickets"));
var router = express_1.Router();
router.get("/", function (req, res) {
    var data = { user: res.locals.user };
    return res.status(200).render("pages/home", data);
});
router.use("/profile", passport_1.isAuthenticated, profile_1.default);
router.use("/restaurants", passport_1.isAuthenticated, restaurants_1.default);
router.use("/tickets", passport_1.isAuthenticated, tickets_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map