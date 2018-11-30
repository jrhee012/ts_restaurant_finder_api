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
import { tokenValidation } from "./middlewares";
import passportMiddleware from "./config/passport";

mongoose.Promise = global.Promise;

try {
    mongoose.connect(configs.MONGODB_URI, { useNewUrlParser: true });

    console.log(`mongodb connected on: ${configs.MONGODB_URI}`);

    if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true);
        console.log("mongoose `debug` set `true`");
    }
} catch (e) {
    console.log(`cannot connect to mongodb on ${configs.MONGODB_URI}!`);
    console.error(e);

    process.exit(1);
}

const viewsPath = "./src/server/views";
const publicPath = "./src/server/public";

const server = express();

// use ejs for view engine for express server
server.use(express.static(path.resolve(publicPath)));
server.set("views", path.resolve(viewsPath));
server.set("view engine", "ejs");

server.use(morgan("combined"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "bambi",
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(configs.BASE_URL, tokenValidation);
server.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// server.use((req: Request, res: Response, next: NextFunction) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//         req.path !== "/login" &&
//         req.path !== "/signup" &&
//         !req.path.match(/^\/auth/) &&
//         !req.path.match(/\./)) {
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//         req.path == "/account") {
//         req.session.returnTo = req.path;
//     }
//     next();
// });

passportMiddleware(passport);

server.use(routes);

export default server;
