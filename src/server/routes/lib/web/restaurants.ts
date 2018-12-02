import { Router } from "express";
import { getAll, getOne } from "../../../controllers/web/restaurants";

const router: Router = Router();

router.get("/", getAll);
router.get("/:restaurantId", getOne);

export default router;
