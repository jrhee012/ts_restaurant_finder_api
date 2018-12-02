"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = { user: res.locals.user };
        return [2 /*return*/, res.status(200).render("pages/profile/index", data)];
    });
}); };
exports.updateProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = res.locals.user;
        return [2 /*return*/];
    });
}); };
exports.saveProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.getAuthenticationPage = function (req, res) {
    var data = { user: res.locals.user };
    return res.status(200).render("pages/profile/authenticate_form");
};
exports.postAuthenticationPage = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var params, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.body;
                if (params.email === undefined || params.email === null) {
                    return [2 /*return*/, res.redirect("/profile/authenticate")];
                }
                if (params.password === undefined || params.password === null) {
                    return [2 /*return*/, res.redirect("/profile/authenticate")];
                }
                user = res.locals.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user.local.email = params.email;
                user.setPassword(params.password);
                user.authenticated = true;
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.log("ERROR post authenticate user controller");
                console.error(e_1.message);
                return [2 /*return*/, res.redirect("/")];
            case 4: return [2 /*return*/, res.redirect("/profile")];
        }
    });
}); };
//# sourceMappingURL=profile.js.map