import { Router } from "express";
import {
    getProfile,
    getAuthenticationPage,
    postAuthenticationPage,
    finishValidation,
} from "../../../controllers/web/profile";

const router: Router = Router();

router.get("/", getProfile);
router.post("/authenticate", postAuthenticationPage);

router.get("/validate/:validationId", finishValidation);

export default router;
