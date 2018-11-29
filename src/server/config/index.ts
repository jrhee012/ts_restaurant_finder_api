import { config } from "dotenv";

config();

class Config {
    PORT: number;
    MONGODB_URI: string;
    BASE_URL: string;

    constructor() {
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;

        this.MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/ts_rest_finder_api";

        this.BASE_URL = "/api/v1";
    }
}

let configs: Config;
configs = new Config();

export default configs;
