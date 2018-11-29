import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import configs from "./config";
import routes from "./routes";

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


const server = express();

server.use(morgan("combined"));
server.use(routes);

export default server;
