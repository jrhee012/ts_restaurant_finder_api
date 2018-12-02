import { Router } from "express";
import { isAuthenticated } from "../../../config/passport";
import profileRouter from "./profile";
import restaurantsRouter from "./restaurants";
import ticketsRouter from "./tickets";

const router: Router = Router();

router.use("/profile", isAuthenticated, profileRouter);
router.use("/restaurants", isAuthenticated, restaurantsRouter);
router.use("/tickets", isAuthenticated, ticketsRouter);

export default router;
