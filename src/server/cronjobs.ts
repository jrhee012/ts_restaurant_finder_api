import { CronJob } from "cron";
import { model, Document, MongooseDocument } from "mongoose";

const Data = model("Data");

console.log("Before job instantiation");
const job1 = new CronJob("* 10 * * * *", async function () {
    // const d = new Date();
    // console.log('At Ten Minutes:', d);
    try {
        let data: MongooseDocument[] = await Data.find();
        if (data.length < 1) {
            data = [];
        }
        console.log(`[CRONJOB name=job1 "* 10 * * * *"] Number of data entries: ${data.length}`);
        // console.log(`Number of data entries: ${data.length}`);
    } catch (e) {
        console.log('[CRONJOB name=job1 "* 10 * * * *"] ERROR');
        console.error(e);
    }
});
console.log("After job instantiation");
job1.start();
