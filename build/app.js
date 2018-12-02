"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var config_1 = __importDefault(require("./config"));
var db_seed_1 = __importDefault(require("./config/db-seed"));
// import "./cronjobs";
var port = config_1.default.PORT;
var dbSeeder = new db_seed_1.default();
dbSeeder.start()
    .catch(function (err) {
    console.error(err);
    process.exit(1);
})
    .then(function () {
    return server_1.default.listen(port, function () { return console.log(server_1.default.name + " listening on port: " + port); });
});
//# sourceMappingURL=app.js.map