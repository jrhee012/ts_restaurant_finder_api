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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var EmailValidator = __importStar(require("email-validator"));
var __1 = require("..");
var UsersSchema = new mongoose_1.Schema({
    local: {
        email: String,
        hash: String,
        salt: String,
    },
    facebook: {
        id: String,
        token: String,
        username: String,
        displayName: String,
        name: mongoose_1.Schema.Types.Mixed,
        gender: String,
        profileUrl: String,
        provider: String,
        full_profile: mongoose_1.Schema.Types.Mixed,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: mongoose_1.Schema.Types.Mixed,
        full_profile: mongoose_1.Schema.Types.Mixed,
    },
    instagram: {
        id: String,
        token: String,
        username: String,
        full_name: String,
        profile_picture: mongoose_1.Schema.Types.Mixed,
    },
    roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Roles", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_login_at: Date,
    active: {
        type: Boolean,
        default: true,
    },
    authenticated: {
        type: Boolean,
        default: false,
    },
});
UsersSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, email, check;
        return __generator(this, function (_a) {
            doc = this;
            if (doc.local === undefined || doc.local === null) {
                next();
            }
            if (doc.local.email === undefined || doc.local.email === null) {
                next();
            }
            else {
                email = doc.local.email;
                check = EmailValidator.validate(email);
                if (!check) {
                    throw new mongoose_1.Error("Invalid Email!");
                }
                next();
            }
            return [2 /*return*/];
        });
    });
});
UsersSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, roles, userRole, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    doc = this;
                    roles = doc.roles || [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, __1.Roles.findOne({ name: "user" })];
                case 2:
                    userRole = _a.sent();
                    roles.forEach(function (role) { return __awaiter(_this, void 0, void 0, function () {
                        var find_role;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, __1.Roles.findById(role)];
                                case 1:
                                    find_role = _a.sent();
                                    if (find_role !== null && userRole !== null) {
                                        if (find_role._id.toString() === userRole._id.toString()) {
                                            return [2 /*return*/, next()];
                                        }
                                        else {
                                            roles.push(userRole._id);
                                            doc.roles = roles;
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    if (roles.length < 1 && userRole !== null) {
                        roles.push(userRole._id);
                        doc.roles = roles;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1.message);
                    // return next(e);
                    throw new mongoose_1.Error(e_1.message);
                case 4: return [2 /*return*/, next()];
            }
        });
    });
});
UsersSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, existing, userProfileValidation, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    doc = this;
                    return [4 /*yield*/, __1.Validations.findOne({ user_id: doc._id })];
                case 1:
                    existing = _a.sent();
                    if (!(existing === null || existing === undefined)) return [3 /*break*/, 5];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    userProfileValidation = new __1.Validations();
                    return [4 /*yield*/, userProfileValidation.createNew(doc._id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log("ERROR create new validation for user");
                    console.error(e_2.message);
                    throw new mongoose_1.Error(e_2.message);
                case 5: return [2 /*return*/, next()];
            }
        });
    });
});
UsersSchema.methods.setPassword = function (password) {
    this.local.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.local.hash = crypto_1.default.pbkdf2Sync(password, this.local.salt, 10000, 512, "sha512").toString("hex");
};
UsersSchema.methods.validatePassword = function (password) {
    var hash = crypto_1.default.pbkdf2Sync(password, this.local.salt, 10000, 512, "sha512").toString("hex");
    return this.local.hash === hash;
};
UsersSchema.methods.generateJWT = function () {
    var today = new Date();
    var expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jsonwebtoken_1.default.sign({
        email: this.local.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, "secret");
};
UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.local.email,
        token: this.generateJWT(),
    };
};
UsersSchema.methods.isAdmin = function () {
    return __awaiter(this, void 0, void 0, function () {
        var admin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.Admins.findOne({ user_id: this._id })];
                case 1:
                    admin = _a.sent();
                    if (admin === null) {
                        return [2 /*return*/, false];
                    }
                    else {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
UsersSchema.methods.completeValidation = function () {
    return __awaiter(this, void 0, void 0, function () {
        var validation, vChcek, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.Validations.findOne({ user_id: this._id })];
                case 1:
                    validation = _a.sent();
                    if (!(validation !== null)) return [3 /*break*/, 6];
                    vChcek = validation.validated;
                    if (!!vChcek) return [3 /*break*/, 5];
                    this.validated = true;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, this.save()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    console.log("ERROR validation model complete validation method");
                    console.log("VALIDATION ENTRY: " + this);
                    console.error(e_3.message);
                    throw new mongoose_1.Error(e_3.message);
                case 5: return [3 /*break*/, 7];
                case 6:
                    console.log("ERROR no validtion for user id: " + this._id);
                    throw new mongoose_1.Error("Internal Server Error: UsersSchema.completeValidation");
                case 7: return [2 /*return*/];
            }
        });
    });
};
UsersSchema.methods.checkValidation = function () {
    return __awaiter(this, void 0, void 0, function () {
        var validation, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, __1.Validations.findOne({ user_id: this._id })];
                case 1:
                    validation = _a.sent();
                    if (validation === null || validation === undefined) {
                        throw new mongoose_1.Error("Internal Server Error: UsersSchema.checkValidation");
                    }
                    return [2 /*return*/, validation.validated];
                case 2:
                    e_4 = _a.sent();
                    console.log("ERROR UsersSchema.checkValidation");
                    console.error(e_4.message);
                    throw new mongoose_1.Error(e_4.message);
                case 3: return [2 /*return*/];
            }
        });
    });
};
UsersSchema.methods.getRoles = function () {
    return __awaiter(this, void 0, void 0, function () {
        var roles_1, role_ids;
        var _this = this;
        return __generator(this, function (_a) {
            try {
                roles_1 = [];
                role_ids = this.roles;
                role_ids.forEach(function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var role;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, __1.Roles.findById(id)];
                            case 1:
                                role = _a.sent();
                                if (role !== null) {
                                    roles_1.push(role);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, roles_1];
            }
            catch (e) {
                console.error(e.message);
                throw new mongoose_1.Error(e.message);
            }
            return [2 /*return*/];
        });
    });
};
UsersSchema.methods.getAllLikes = function () {
    return __awaiter(this, void 0, void 0, function () {
        var likes, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, __1.Likes.find({ user_id: this._id })];
                case 1:
                    likes = _a.sent();
                    return [2 /*return*/, likes];
                case 2:
                    e_5 = _a.sent();
                    console.error(e_5.message);
                    throw new mongoose_1.Error(e_5.message);
                case 3: return [2 /*return*/];
            }
        });
    });
};
mongoose_1.model("Users", UsersSchema);
//# sourceMappingURL=Users.js.map