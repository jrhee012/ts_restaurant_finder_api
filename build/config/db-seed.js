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
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var models_1 = require("../models");
var defaultPermissions = [
    {
        name: "read",
    },
    {
        name: "write",
    },
    {
        name: "update",
    },
    {
        name: "delete",
    },
];
var defaultRoles = [
    {
        name: "admin",
    },
    {
        name: "user",
    },
];
var DBSeeder = /** @class */ (function () {
    function DBSeeder() {
        console.log("starting db initializer!");
    }
    DBSeeder.prototype.help = function () {
        var helpMessage = "this is help!";
        return helpMessage;
    };
    DBSeeder.prototype.removeAll = function (modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, roles, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!modelName) return [3 /*break*/, 5];
                        permissions = new Promise(function (resolve, reject) {
                            models_1.Permissions.deleteMany({}, function (err) {
                                if (err) {
                                    console.log("mongodb REMOVE err!");
                                    // console.error(err);
                                    reject(err);
                                }
                                resolve();
                            });
                        });
                        roles = new Promise(function (resolve, reject) {
                            models_1.Roles.deleteMany({}, function (err) {
                                if (err) {
                                    console.log("mongodb REMOVE err!");
                                    // console.error(err);
                                    reject(err);
                                }
                                resolve();
                            });
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log("starting remove all...");
                        return [4 /*yield*/, Promise.all([permissions, roles])];
                    case 2:
                        _a.sent();
                        console.log("remove all finished successfully");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("error remove all!");
                        console.error(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (modelName.toLowerCase() === "permissions") {
                                models_1.Permissions.deleteMany({}, function (err) {
                                    if (err) {
                                        console.log("mongodb REMOVE err!");
                                        // console.error(err);
                                        reject(err);
                                    }
                                    resolve();
                                });
                            }
                            if (modelName.toLowerCase() === "roles") {
                                models_1.Roles.deleteMany({}, function (err) {
                                    if (err) {
                                        console.log("mongodb REMOVE err!");
                                        // console.error(err);
                                        reject(err);
                                    }
                                    resolve();
                                });
                            }
                        })];
                }
            });
        });
    };
    DBSeeder.prototype.seedPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        permissions = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.Permissions.create(defaultPermissions)];
                    case 2:
                        permissions = _a.sent();
                        console.log("all `PERMISSIONS` saved to db!");
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log("`PERMISSIONS` seeding ERROR!");
                        console.error(e_2.message);
                        return [2 /*return*/, process.exit(1)];
                    case 4: return [2 /*return*/, permissions];
                }
            });
        });
    };
    DBSeeder.prototype.seedRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var roles, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roles = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, models_1.Roles.create(defaultRoles)];
                    case 2:
                        roles = _a.sent();
                        console.log("all `ROLES` saved to db!");
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log("`ROLES` seeding ERROR!");
                        console.error(e_3.message);
                        return [2 /*return*/, process.exit(1)];
                    case 4: return [2 /*return*/, roles];
                }
            });
        });
    };
    /**
     * Returns an object with arrays of `Roles` and `Permissions` entries
     *  with `modelName` (i.e. `permissions` or `roles`) as the key.
     */
    DBSeeder.prototype.findAllAndUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, roles, e_4, results, e_5, _a, e_6, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, models_1.Permissions.find({})];
                    case 1:
                        permissions = _c.sent();
                        return [4 /*yield*/, models_1.Roles.find({})];
                    case 2:
                        roles = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _c.sent();
                        console.log("FINDALL ERROR!");
                        console.error(e_4.message);
                        return [2 /*return*/, process.exit(1)];
                    case 4:
                        results = {
                            permissions: permissions,
                            roles: roles,
                        };
                        if (!(results.permissions.length !== defaultPermissions.length)) return [3 /*break*/, 10];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.removeAll("permissions")];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_5 = _c.sent();
                        console.error(e_5.message);
                        return [2 /*return*/, process.exit(1)];
                    case 8:
                        _a = results;
                        return [4 /*yield*/, this.seedPermissions()];
                    case 9:
                        _a.permissions = _c.sent();
                        _c.label = 10;
                    case 10:
                        if (!(results.roles.length !== defaultRoles.length)) return [3 /*break*/, 16];
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, this.removeAll("roles")];
                    case 12:
                        _c.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_6 = _c.sent();
                        console.error(e_6.message);
                        return [2 /*return*/, process.exit(1)];
                    case 14:
                        _b = results;
                        return [4 /*yield*/, this.seedRoles()];
                    case 15:
                        _b.roles = _c.sent();
                        _c.label = 16;
                    case 16: return [4 /*yield*/, this.assignPermissions()];
                    case 17:
                        _c.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * Assign roles with corresponding permissions.
     */
    DBSeeder.prototype.assignPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, admin_permissions, user_permissions, roles, admin, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Permissions.find({})];
                    case 1:
                        permissions = _a.sent();
                        admin_permissions = [];
                        user_permissions = [];
                        permissions.forEach(function (perm) {
                            admin_permissions.push(perm._id);
                            if (perm.name === "read"
                                || perm.name === "write"
                                || perm.name === "update") {
                                user_permissions.push(perm._id);
                            }
                        });
                        return [4 /*yield*/, models_1.Roles.find({})];
                    case 2:
                        roles = _a.sent();
                        admin = lodash_1.find(roles, { name: "admin" });
                        if (!(admin !== undefined)) return [3 /*break*/, 4];
                        admin.scopes = admin_permissions;
                        return [4 /*yield*/, admin.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        user = lodash_1.find(roles, { name: "user" });
                        if (!(user !== undefined)) return [3 /*break*/, 6];
                        user.scopes = user_permissions;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log("updated roles!");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initialize DBSeeder to check for DB entries requirements and
     * create entries if missing.
     */
    DBSeeder.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("initializing db seeds...");
                        return [4 /*yield*/, this.findAllAndUpdate()];
                    case 1:
                        _a.sent();
                        console.log("db seed finished successfully!");
                        return [2 /*return*/];
                }
            });
        });
    };
    return DBSeeder;
}());
exports.default = DBSeeder;
//# sourceMappingURL=db-seed.js.map