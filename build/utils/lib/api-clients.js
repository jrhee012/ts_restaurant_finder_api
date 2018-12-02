"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var request_promise_1 = __importDefault(require("request-promise"));
var lodash_1 = __importDefault(require("lodash"));
var config_1 = __importDefault(require("../../config"));
var models_1 = require("../../models");
var ApiClient = /** @class */ (function () {
    // httpOptions: OptionsWithUri;
    function ApiClient() {
    }
    ApiClient.prototype.makeCall = function (httpOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var isJson, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (config_1.default.NODE_ENV !== "production") {
                            console.log("Calling: " + JSON.stringify(httpOptions.uri));
                            console.log("Headers: " + JSON.stringify(httpOptions.headers));
                            console.log("Body: " + JSON.stringify(httpOptions.body));
                            console.log("QS: " + JSON.stringify(httpOptions.qs));
                        }
                        isJson = httpOptions.json;
                        if (isJson === null || isJson === undefined || !isJson) {
                            lodash_1.default.assign(httpOptions, { json: true });
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request_promise_1.default(httpOptions)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("ERROR ApiClient makeCall");
                        if (config_1.default.NODE_ENV !== "production") {
                            console.error(e_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    return ApiClient;
}());
var YelpApiClient = /** @class */ (function (_super) {
    __extends(YelpApiClient, _super);
    function YelpApiClient() {
        var _this = _super.call(this) || this;
        _this.baseUrl = config_1.default.YELP_BASE_URL;
        return _this;
    }
    YelpApiClient.prototype.searchBusinesses = function (query) {
        var searchQueries = {
            term: query.term,
            type: "restaurants",
            sort_by: "best_match",
            location: query.location,
            limit: 50,
        };
        var headers = {
            "Authorization": "Bearer " + config_1.default.YELP_API_KEY,
        };
        var options = {
            uri: this.baseUrl + "/businesses/search",
            method: "get",
            headers: headers,
            qs: searchQueries,
            json: true,
        };
        return this.makeCall(options);
    };
    YelpApiClient.prototype.searchOneBusniness = function (id) {
        var headers = {
            "Authorization": "Bearer " + config_1.default.YELP_API_KEY,
        };
        var options = {
            uri: this.baseUrl + "/businesses/" + id,
            method: "get",
            headers: headers,
            json: true,
        };
        return this.makeCall(options);
    };
    YelpApiClient.prototype.saveYelpData = function (data) {
        var self = this;
        models_1.Data.findOneAndUpdate({
            ext_id: data.id,
            source: "yelp",
        }, {
            ext_id: data.id,
            raw_data: data,
            source: "yelp",
        }, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }, function (err, doc) {
            if (err) {
                console.error(err);
            }
            console.log("yelp data saved!", doc == undefined);
            if (doc !== null) {
                var name_1;
                var coords = {};
                var rawData = data;
                name_1 = rawData.name;
                coords = rawData.location;
                var transactions = rawData.transactions;
                var reservation = [];
                if (lodash_1.default.includes(transactions, "restaurant_reservation")) {
                    reservation = ["yelp"];
                }
                models_1.Restaurants.findOneAndUpdate({
                    name: name_1,
                    location: coords,
                }, {
                    name: name_1,
                    alias: rawData.name,
                    categories: rawData.categories,
                    coordinates: rawData.coordinates,
                    location: rawData.location,
                    display_address: rawData.location.display_address,
                    phone_number: rawData.phone,
                    reservation: reservation,
                    source_data: [doc._id],
                }, {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                }, function (err, doc) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("restaurant data saved!");
                });
            }
        });
    };
    return YelpApiClient;
}(ApiClient));
exports.YelpApiClient = YelpApiClient;
//# sourceMappingURL=api-clients.js.map