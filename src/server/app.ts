import server from "./server";
import configs from "./config";
// import { redisClient } from "./utils";

// require("./models/Data");
// require("./models/Restaurants");
// redisClient.onConnect();
// console.log(redisClient);
import "./models/Restaurants";
import "./models/Data";

const port = configs.PORT;

server.listen(port);

console.log(`Server started on: ${port}`);
