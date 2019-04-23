import { Router } from "express";
import { isAuthenticated } from "../../../config/passport";
import profileRouter from "./profile";
import restaurantsRouter from "./restaurants";
import ticketsRouter from "./tickets";
import likesRouter from "./likes";
import { checkAuthenticated } from "../../../utils";

const router: Router = Router();

router.use("/profile", profileRouter);
router.use("/restaurants", checkAuthenticated, restaurantsRouter);
router.use("/tickets", ticketsRouter);
router.use("/likes", likesRouter);

export default router;
