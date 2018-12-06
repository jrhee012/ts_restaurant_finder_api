"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var express_flash_1 = __importDefault(require("express-flash"));
var express_session_1 = __importDefault(require("express-session"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
// import { tokenValidation } from "./middlewares";
var passport_2 = __importDefault(require("./config/passport"));
// import { UsersModel } from "./models/lib/Users";
exports.__ROOT__ = __dirname;
try {
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true });
    console.log("mongodb connected on: " + config_1.default.MONGODB_URI);
    if (process.env.NODE_ENV !== "production") {
        // mongoose.set("debug", true);
        console.log("mongoose `debug` set `true`");
    }
}
catch (e) {
    console.log("cannot connect to mongodb on " + config_1.default.MONGODB_URI + "!");
    console.error(e.message);
    process.exit(1);
}
var NODE_ENV = config_1.default.NODE_ENV;
var viewsPath;
var publicPath;
if (NODE_ENV === "production") {
    viewsPath = "./build/views";
    publicPath = "./build/public";
}
else {
    viewsPath = "./src/server/views";
    publicPath = "./src/server/public";
}
var server = express_1.default();
// use ejs for view engine for express server
server.use(express_1.default.static(path_1.default.resolve(publicPath)));
server.set("views", path_1.default.resolve(viewsPath));
server.set("view engine", "ejs");
// Load middlewares
server.use(morgan_1.default("dev"));
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: config_1.default.SESSION_SECRET,
}));
server.use(passport_1.default.initialize());
server.use(passport_1.default.session());
server.use(express_flash_1.default());
// server.use(configs.API_BASE_URL, tokenValidation);
server.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
// Load passport configs
passport_2.default(passport_1.default);
server.use(routes_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map