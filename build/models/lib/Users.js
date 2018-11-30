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
var mongoose_1 = require("mongoose");
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var __1 = require("..");
var lodash_1 = require("lodash");
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
    // histories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Saves", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_login_at: Date,
    active: {
        type: Boolean,
        default: true,
    },
});
UsersSchema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, roles, userRole, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    doc = this;
                    roles = doc.roles;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, __1.Roles.findOne({ name: "user" })];
                case 2:
                    userRole = _a.sent();
                    if (userRole !== null && lodash_1.includes(roles, userRole._id)) {
                        return [2 /*return*/, next()];
                    }
                    if (userRole !== null && !lodash_1.includes(roles, userRole._id)) {
                        roles.push(userRole._id);
                        doc.roles = roles;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
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
mongoose_1.model("Users", UsersSchema);
//# sourceMappingURL=Users.js.map