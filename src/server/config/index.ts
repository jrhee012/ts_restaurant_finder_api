import { config } from "dotenv";

config();

class Config {
    PORT: number;
    MONGODB_URI: string;
    BASE_URL: string;
    TOKEN: string;

    constructor() {
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;

        this.MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/ts_rest_finder_api";

        this.BASE_URL = "/api/v1";

        this.TOKEN = process.env.TOKEN ? process.env.TOKEN : "";
    }
}

let configs: Config;
configs = new Config();

export default configs;
