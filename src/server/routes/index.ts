import { Router, Application } from "express";
// import api from "./lib/api";
import restaurants from "./lib/restaurants";
import data from "./lib/data";
import configs from "../config";

const baseUrl: string = configs.BASE_URL;

let router: Router;
router = Router();

router.use(`${baseUrl}/restaurants`, restaurants);
router.use(`${baseUrl}/data`, data);

export default router;
