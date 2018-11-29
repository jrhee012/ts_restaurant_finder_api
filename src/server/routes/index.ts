import { Router, Application } from "express";
// import api from "./lib/api";
import restaurants from "./lib/restaurants";
import data from "./lib/data";
import configs from "../config";
import { redisClient } from "../utils";

const baseUrl: string = configs.BASE_URL;

let router: Router;
router = Router();

// TODO: TEST!!!
router.get("/", async (req, res) => {
    console.log(1);
    const a = await redisClient.get("test");
    console.log(2);
    console.log(a);
    redisClient.set("test22", "test222");
    const b = await redisClient.get("test22");
    console.log(b);
    return res.status(200);
});

router.use(`${baseUrl}/restaurants`, restaurants);
router.use(`${baseUrl}/data`, data);

export default router;
