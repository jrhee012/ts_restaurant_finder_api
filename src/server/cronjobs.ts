import { CronJob } from "cron";
import { model, Document, MongooseDocument } from "mongoose";
import logger from "./config/logger";

const Data = model("Data");

logger.info("Before job instantiation");
const job1 = new CronJob("* 0,30 * * * *", async function () {
    // const d = new Date();
    // logger.debug('At Ten Minutes:', d);
    try {
        let data: MongooseDocument[] = await Data.find();
        if (data.length < 1) {
            data = [];
        }
        logger.info(`[CRONJOB name=job1] Number of data entries: ${data.length}`);
        // logger.debug(`Number of data entries: ${data.length}`);
    } catch (e) {
        logger.error("[CRONJOB name=job1] ERROR");
        logger.error(e.message);
    }
});
logger.info("After job instantiation");
job1.start();
