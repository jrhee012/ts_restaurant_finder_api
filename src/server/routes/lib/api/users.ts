import { Router } from "express";
import { getAll, getOne } from "../../../controllers/api/users";

const router: Router = Router();

router.get("/", getAll);
router.get("/:userId", getOne);

export default router;
