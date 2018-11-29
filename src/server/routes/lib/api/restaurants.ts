import { Router } from "express";
import { index } from "../../../controllers/api/restaurants-controllers";

const router: Router = Router();

router.get("/", index);

export default router;
