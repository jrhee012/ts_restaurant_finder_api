import { Router } from "express";
import { searchAndCreate } from "../../../controllers/api/data-controllers";

const router: Router = Router();

router.get("/search", searchAndCreate);

export default router;
