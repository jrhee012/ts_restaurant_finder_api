import server from "./server";
import configs from "./config";

// require("./models/Data");
// require("./models/Restaurants");

import "./models/Restaurants";
import "./models/Data";

const port = configs.PORT;

server.listen(port);

console.log(`Server started on: ${port}`);
