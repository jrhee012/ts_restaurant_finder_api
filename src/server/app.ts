import server from "./server";
import configs from "./config";

const port = configs.PORT;

server.listen(port);

console.log(`Server started on: ${port}`);
