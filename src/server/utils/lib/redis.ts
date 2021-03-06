import redis, { RedisClient } from "redis";
import { promisify } from "util";
import configs from "../../config";
import logger from "../../config/logger";

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
        logger.info(`No cache at ${cacheHost}`);
    }

    onConnect(): void {
        this.cacheExists = true;
        logger.info(`Redis connected on ${cacheHost}`);
    }

    onError(error: Error): void {
        logger.error("ERROR redis cache");
        logger.error(error);
        this.cacheExists = false;
        this.noCacheMessage();
    }

    onEnd() {
        this.cacheExists = false;
        this.noCacheMessage();
    }

    startClient() {
        const cache = redis.createClient(cacheHost, {
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

        redis.set(key, attr, "EX", 60 * 60);
        logger.debug(`> Cache set with key: ${key} for 60 mins`);
    }

    async get(key: string) {
        const redis = this.client;

        if (!redis || !this.cacheExists) {
            this.noCacheMessage();
            return;
        }

        const getAsync = promisify(redis.get).bind(redis);

        let result: any = undefined;
        try {
            result = await getAsync(key);
            logger.debug(`> Cache retrieved with key: ${key}`);
        } catch (e) {
            logger.error("ERROR redis cache get");
            logger.error(e.message);
        }

        if (result !== null) {
            result = JSON.parse(result);
        }

        return result;
    }
}

export const redisClient = new RedisCache();
