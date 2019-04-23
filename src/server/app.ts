import server from "./server";
import configs from "./config";
import DBSeeder from "./config/db-seed";
import logger from "./config/logger";
// import "./cronjobs";

export const __ROOT__: string = __dirname;
const port = configs.PORT;

const dbSeeder = new DBSeeder();
dbSeeder.start()
    .catch(err => {
        logger.error(err);
        process.exit(1);
    })
    .then(() => {
        return server.listen(port, () => logger.info(`${server.name} listening on port: ${port}`));
    });
