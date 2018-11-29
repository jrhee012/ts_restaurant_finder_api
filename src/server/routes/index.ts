import { Router, Application, Request, Response } from "express";
// import api from "./lib/api";
import restaurants from "./lib/api/restaurants";
import data from "./lib/api/data";
import configs from "../config";
import { redisClient } from "../utils";

const ApiBaseUrl: string = configs.BASE_URL;

let router: Router;
router = Router();

// TODO: TEST!!!
router.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({
        code: 200,
        message: "hello world!",
        data: {},
    });
});

// API
router.use(`${ApiBaseUrl}/restaurants`, restaurants);
router.use(`${ApiBaseUrl}/data`, data);

export default router;
