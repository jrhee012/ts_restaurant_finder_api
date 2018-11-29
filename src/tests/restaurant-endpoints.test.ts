import server from "../server/server";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import configs from "../server/config";

chai.use(chaiHttp);
const expect = chai.expect;
const token = configs.TOKEN;

describe("Root API Request", () => {
    it("should return response on call", async () => {
        const result = await chai.request(server).get("/");
        expect(result.status).to.eql(200);
    });
});

describe("Restaurant Controllers", () => {
    it("should return a list of restaurants for '/restaurants'", async () => {
        const results = await chai.request(server)
            .get("/api/v1/restaurants")
            .set("token", token);
        // console.log('rrr', results.body)
        expect(results.status).to.eql(200);
        expect(typeof results.body).to.eql("object");
    });
});
