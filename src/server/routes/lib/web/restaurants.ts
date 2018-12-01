import { Router } from "express";
import { getAll, getOne } from "../../../controllers/web/restaurants";
import { isAuthenticated } from "../../../config/passport";
import { checkAuthenticated } from "../../../utils";

const router: Router = Router();

router.get("/", getAll);
// router.get("/", isAuthenticated, getAll);

router.get("/:restaurantId", getOne);
// router.get("/:restaurantId", checkAuthenticated, getOne);

export default router;
