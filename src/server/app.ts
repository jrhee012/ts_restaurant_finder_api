import server from "./server";
import configs from "./config";
import DBSeeder from "./config/db-seed";
// import "./cronjobs";

const port = configs.PORT;

// server.listen(port);

// console.log(`Server started on: ${port}`);

const dbSeeder = new DBSeeder();
dbSeeder.start()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .then(() => {
        return server.listen(port, () => console.log(`${server.name} listening on port: ${port}`));
    });
