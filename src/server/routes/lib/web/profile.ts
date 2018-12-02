import { Router } from "express";
import { getProfile, getAuthenticationPage, postAuthenticationPage } from "../../../controllers/web/profile";

const router: Router = Router();

router.get("/", getProfile);
router.get("/authenticate", getAuthenticationPage);
router.post("/authenticate", postAuthenticationPage);

export default router;
