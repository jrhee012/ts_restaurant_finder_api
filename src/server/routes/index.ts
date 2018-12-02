import { Router, Request, Response } from "express";
import configs from "../config";
import { isAuthenticated, isAdmin } from "../config/passport";

// ADMIN ROUTERS
import adminRouter from "./lib/admin";

// API ROUTERS
import apiRouter from "./lib/api";

// LOGIN ROUTERS
import loginRouter from "./lib/web/login";

// WEB ROUTERS
import webRouter from "./lib/web";

const ApiBaseUrl: string = configs.BASE_URL;

const router: Router = Router();

// API
router.use(`${ApiBaseUrl}`, apiRouter);

// ADMIN
router.use("/admin", isAuthenticated, isAdmin, adminRouter);

// LOGIN
router.use("/", loginRouter);

// WEB
router.get("/", (req: Request, res: Response) => {
    const alert = req.flash("error") || [];
    const success = req.flash("success") || [];

    const data = {
        user: res.locals.user,
        alert: alert,
        success: success,
    };
    return res.status(200).render("pages/home", data);
});

router.use("/", isAuthenticated, webRouter);

// EASTER EGGGGS
router.get("/jen", (req: Request, res: Response) => {
    return res.status(200).send("i love you, jen <3");
});

export default router;
