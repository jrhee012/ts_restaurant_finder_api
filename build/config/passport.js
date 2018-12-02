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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_local_1 = __importDefault(require("passport-local"));
var passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
// import passportFacebook from "passport-facebook";
var lodash_1 = __importDefault(require("lodash"));
var models_1 = require("../models");
var config_1 = __importDefault(require("../config"));
var LocalStrategy = passport_local_1.default.Strategy;
// const FacebookStrategy = passportFacebook.Strategy;
var GoogleStrategy = passport_google_oauth2_1.default.Strategy;
exports.default = (function (passport) {
    passport.serializeUser(function (user, done) {
        done(undefined, user.id);
    });
    passport.deserializeUser(function (id, done) {
        models_1.Users.findById(id, function (err, user) {
            done(err, user);
        });
    });
    /**
     * Sign in using Email and Password.
     */
    passport.use(new LocalStrategy({ passReqToCallback: true }, function (req, email, password, done) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.Users.findOne({ "local.email": email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, done(undefined, false, req.flash("error", "Incorrect username."))];
                        }
                        if (!user.validatePassword(password)) {
                            return [2 /*return*/, done(undefined, false, req.flash("error", "Incorrect password."))];
                        }
                        user.last_login_at = new Date().toISOString();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, done(undefined, user)];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1.message);
                        return [2 /*return*/, done(undefined, false, req.flash("error", e_1.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use("local-signup", new LocalStrategy({ passReqToCallback: true }, function (req, email, password, done) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.Users.findOne({ "local.email": email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, done(undefined, false, req.flash("error", "That email is already taken."))];
                        }
                        user = new models_1.Users();
                        user.local.email = email;
                        user.setPassword(password);
                        user.created_at = new Date().toISOString();
                        user.last_login_at = new Date().toISOString();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, done(undefined, user)];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2.message);
                        return [2 /*return*/, done(undefined, false, req.flash("error", e_2.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }));
    // =========================================================================
    // GOOGLE LOGIN ============================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID: config_1.default.GOOGLE_CLIENT_ID,
        clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
        callbackURL: config_1.default.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
    }, function (req, accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function () {
            var user, googleResp, savedUser, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, models_1.Users.findOne({ "google.id": profile.id })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 3];
                        googleResp = {
                            id: profile.id,
                            token: accessToken,
                            email: profile.email,
                            name: profile.name,
                            full_profile: profile,
                        };
                        user = new models_1.Users();
                        user.google = googleResp;
                        user.last_login_at = new Date().toISOString();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        savedUser = _a.sent();
                        return [2 /*return*/, done(undefined, savedUser, req.flash("success", "Log in successful!"))];
                    case 3:
                        user.last_login_at = new Date().toISOString();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _a.sent();
                        done(undefined, user, req.flash("success", "Log in successful!"));
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        console.log("google login error");
                        console.error(e_3);
                        return [2 /*return*/, done(undefined, false, req.flash("error", e_3.message))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }));
});
/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
    var provider = req.path.split("/").slice(-1)[0];
    if (lodash_1.default.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect("/auth/" + provider);
    }
};
/**
 * Admin Required middleware
 */
exports.isAdmin = function (req, res, next) {
    var user = res.locals.user;
    var check = user.isAdmin();
    if (!check) {
        res.redirect("/");
    }
    next();
};
//# sourceMappingURL=passport.js.map