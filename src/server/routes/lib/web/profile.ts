import { Router } from "express";
import { getProfile } from "../../../controllers/web/profile";

const router: Router = Router();

router.get("/", getProfile);

export default router;
