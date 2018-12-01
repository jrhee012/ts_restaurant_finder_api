import { Router } from "express";
import { getAll, getOne } from "../../../controllers/web/restaurants";
import { isAuthenticated } from "../../../config/passport";

const router: Router = Router();

router.get("/", getAll);
// router.get("/", isAuthenticated, getAll);
router.get("/:restaurantId", getOne);

export default router;
