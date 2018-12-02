import { Router } from "express";
import { homePage } from "../../../controllers/admin";

const router: Router = Router();

router.get("/", homePage);

export default router;
