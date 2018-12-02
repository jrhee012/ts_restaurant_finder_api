import { Router, Request, Response } from "express";
import { isAuthenticated, isAdmin } from "../../../config/passport";
import profileRouter from "./profile";
import restaurantsRouter from "./restaurants";
import ticketsRouter from "./tickets";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    return res.status(200).render("pages/home", data);
});

router.use("/profile", isAuthenticated, profileRouter);
router.use("/restaurants", isAuthenticated, restaurantsRouter);
router.use("/tickets", isAuthenticated, ticketsRouter);

export default router;
