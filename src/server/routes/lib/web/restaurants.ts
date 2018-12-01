import { Router } from "express";
import { getAll } from "../../../controllers/web/restaurants";
import { isAuthenticated } from "../../../config/passport";

const router: Router = Router();

router.get("/", getAll);
// router.get("/", isAuthenticated, getAll);

export default router;
