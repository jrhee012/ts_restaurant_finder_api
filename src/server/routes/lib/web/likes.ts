import { Router } from "express";
import { addLike } from "../../../controllers/web/likes";

const router: Router = Router();

router.get("/add", addLike);

export default router;
