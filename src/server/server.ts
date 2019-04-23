import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import configs from "./config";
import routes from "./routes";
// import { tokenValidation } from "./middlewares";
import passportMiddleware from "./config/passport";
// import { UsersModel } from "./models/lib/Users";
import logger from "./config/logger";

export const __ROOT__: string = __dirname;

try {
    mongoose.Promise = global.Promise;
    mongoose.connect(configs.MONGODB_URI, { useNewUrlParser: true });

    logger.info(`mongodb connected on: ${configs.MONGODB_URI}`);
    logger.debug("mongoose `debug` set `true`");
} catch (e) {
    logger.error(`cannot connect to mongodb on ${configs.MONGODB_URI}!`);
    logger.error(e.message);
    process.exit(1);
}

const NODE_ENV = configs.NODE_ENV;

let viewsPath: string;
let publicPath: string;

if (NODE_ENV === "production") {
    viewsPath = "./build/views";
    publicPath = "./build/public";
} else {
    viewsPath = "./src/server/views";
    publicPath = "./src/server/public";
}

const server = express();

// use ejs for view engine for express server
server.use(express.static(path.resolve(publicPath)));
server.set("views", path.resolve(viewsPath));
server.set("view engine", "ejs");

// Load middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: configs.SESSION_SECRET,
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
// server.use(configs.API_BASE_URL, tokenValidation);
server.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
});

// Load passport configs
passportMiddleware(passport);

server.use(routes);

export default server;
