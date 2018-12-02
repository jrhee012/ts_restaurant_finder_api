import { Router } from "express";
import { getAll } from "../../../controllers/web/tickets";

const router: Router = Router();

router.get("/", getAll);

export default router;
