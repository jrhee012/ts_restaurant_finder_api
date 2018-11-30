import { config } from "dotenv";

config();

class Config {
    NODE_ENV: string;
    PORT: number;
    MONGODB_URI: string;
    REDIS_URL: string;
    // CACHE_KEY: string;
    CACHE_TTL: number;
    BASE_URL: string;
    TOKEN: string;
    YELP_BASE_URL: string;
    YELP_API_KEY: string;
    YELP_CLIENT_ID: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;

    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || "dev";
        this.PORT = process.env.PORT ? parseInt(process.env.PORT) : 1337;

        // MongoDB config
        this.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ts_rest_finder_api";

        // Redis config
        this.REDIS_URL = process.env.REDIS_URL || "localhost:6379";
        this.CACHE_TTL = 900;

        // API config
        this.BASE_URL = "/api/v1";
        this.TOKEN = process.env.TOKEN || "";

        // Yelp Fusion API config
        this.YELP_BASE_URL = process.env.YELP_BASE_URL || "https://api.yelp.com/v3";
        this.YELP_API_KEY = process.env.YELP_API_KEY || "";
        this.YELP_CLIENT_ID = process.env.YELP_CLIENT_ID || "";

        // Google Api config
        this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
        this.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
        this.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "";
    }
}

let configs: Config;
configs = new Config();

export default configs;
