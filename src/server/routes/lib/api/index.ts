import { Router } from "express";
import restaurants from "./restaurants";
import data from "./data";

const router: Router = Router();

router.use("/restaurants", restaurants);
router.use("/data", data);

export default router;
