import redis, { RedisClient } from "redis";
import { promisify } from "util";
import configs from "../../config";

const cacheHost: string = configs.REDIS_URL;
const cacheRetrySeconds: number = 1000;

class RedisCache {
    cacheExists: boolean;
    client?: RedisClient;

    constructor() {
        this.cacheExists = false;
        this.client = undefined;
        this.startClient();
    }

    noCacheMessage() {
        console.log(`No cache at ${cacheHost}`);
    }

    onConnect(): void {
        this.cacheExists = true;
        console.log(`Redis connected on ${cacheHost}`);
    }

    onError(error: Error): void {
        console.log("ERROR redis cache");
        console.error(error);
        this.cacheExists = false;
        this.noCacheMessage();
    }

    onEnd() {
        this.cacheExists = false;
        this.noCacheMessage();
    }

    startClient() {
        const cache = redis.createClient(`redis://${cacheHost}`, {
            enable_offline_queue: false,
            retry_strategy: () => cacheRetrySeconds,
        });

        cache.on("connect", () => {
            this.client = cache;
            this.onConnect();
        });
        cache.on("error", (err) => this.onError(err));
        cache.on("end", () => this.onEnd());
    }

    set(key: string, value: any) {
        const redis = this.client;

        if (!redis || !this.cacheExists) {
            this.noCacheMessage();
            return;
        }

        let attr: string;
        if (typeof value === "string") {
            attr = value;
        } else {
            attr = JSON.stringify(value);
        }

        redis.set(key, attr);
        console.log(`> Cache set with key: ${key}`);
    }

    async get(key: string) {
        const redis = this.client;

        if (!redis || !this.cacheExists) {
            this.noCacheMessage();
            return;
        }

        const getAsync = promisify(redis.get).bind(redis);

        let result: any;
        try {
            result = getAsync(key);
        } catch (e) {
            console.log("ERROR redis cache get");
            console.error(e);
        }
        return result;
    }
}

export const redisClient = new RedisCache();
