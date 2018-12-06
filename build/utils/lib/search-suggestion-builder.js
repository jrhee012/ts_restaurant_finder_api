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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// import { includes } from "lodash";
var fs_1 = require("fs");
var config_1 = __importDefault(require("../../config"));
var path_1 = __importDefault(require("path"));
var models_1 = require("../../models");
var SearchSuggestionBuilder = /** @class */ (function () {
    function SearchSuggestionBuilder() {
        this.data = undefined;
        this.file_location = undefined;
        this.transformed = [];
    }
    SearchSuggestionBuilder.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var new_data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.Restaurants.find()];
                    case 1:
                        new_data = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("ERROR search suggestion builder update data method");
                        console.error(e_1.message);
                        new_data = [];
                        return [3 /*break*/, 3];
                    case 3:
                        if (new_data.length > 0) {
                            this.data = new_data;
                        }
                        return [2 /*return*/, new_data];
                }
            });
        });
    };
    SearchSuggestionBuilder.prototype.createList = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var list, i, d, source, id, name_1, address, category, promiseAllArr, i_1, query, promiseAll, rawData, check, i_2, address_str, i_3, j, name_2, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < data.length)) return [3 /*break*/, 4];
                        d = data[i];
                        source = d.source_data;
                        id = d._id.toString();
                        name_1 = undefined;
                        address = undefined;
                        category = [];
                        promiseAllArr = [];
                        for (i_1 = 0; i_1 < source.length; i_1++) {
                            query = models_1.Data.findById(source[i_1]);
                            promiseAllArr.push(query);
                        }
                        promiseAll = new Set(promiseAllArr);
                        return [4 /*yield*/, Promise.all(promiseAll)];
                    case 2:
                        rawData = _a.sent();
                        check = false;
                        // TODO: better logic for multiple sources
                        for (i_2 = 0; i_2 < rawData.length; i_2++) {
                            if (rawData[i_2].source === "yelp") {
                                check = true;
                                break;
                            }
                        }
                        if (check) {
                            name_1 = d.name;
                            address_str = "";
                            for (i_3 = 0; i_3 < d.display_address.length; i_3++) {
                                if (i_3 == d.display_address.length - 1) {
                                    address_str += d.display_address[i_3];
                                }
                                else {
                                    address_str += d.display_address[i_3] + ", ";
                                }
                            }
                            address = address_str;
                            for (j = 0; j < d.categories.length; j++) {
                                name_2 = d.categories[j].title;
                                category.push(name_2);
                            }
                        }
                        if (name_1 !== undefined && address !== undefined) {
                            entry = {
                                id: id,
                                name: name_1,
                                address: address,
                                category: category,
                            };
                            list.push(entry);
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.transformed = list;
                        return [2 /*return*/];
                }
            });
        });
    };
    SearchSuggestionBuilder.prototype.getList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getData()];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.createList(data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.transformed];
                }
            });
        });
    };
    SearchSuggestionBuilder.prototype.saveList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, buildDir, fileDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.transformed;
                        if (!(data.length < 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getList()];
                    case 1:
                        data = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (config_1.default.NODE_ENV === "production") {
                            buildDir = "build/public";
                        }
                        else {
                            buildDir = "src/server/public";
                        }
                        fileDir = path_1.default.resolve("./" + buildDir + "/data/search-suggestions");
                        // TODO: save multiple files?
                        this.file_location = fileDir + "/data.json";
                        console.log(data);
                        try {
                            if (!fs_1.existsSync(fileDir)) {
                                fs_1.mkdirSync(fileDir, { recursive: true });
                            }
                            fs_1.writeFileSync(this.file_location, JSON.stringify(data), { flag: "w", encoding: "utf8" });
                            console.log("File created!", data.length);
                        }
                        catch (e) {
                            console.log("ERROR - CANNOT CREATE FILE!");
                            console.error(e);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SearchSuggestionBuilder;
}());
var builder = new SearchSuggestionBuilder();
console.log("> STARTING SUGGESTION BUILDER SAVE LIST");
(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, builder.saveList()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); })();
setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("> STARTING SUGGESTION BUILDER SAVE LIST");
                return [4 /*yield*/, builder.saveList()];
            case 1:
                _a.sent();
                console.log("> COMPLETED SUGGESTION BUILDER SAVE LIST");
                return [2 /*return*/];
        }
    });
}); }, 30 * 60 * 1000);
exports.suggestionBuilder = builder;
//# sourceMappingURL=search-suggestion-builder.js.map