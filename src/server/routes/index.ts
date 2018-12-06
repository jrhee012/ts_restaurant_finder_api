import { Router, Request, Response } from "express";
import configs from "../config";
import { isAuthenticated, isAdmin } from "../config/passport";
import { setAlerts, tokenValidation } from "../middlewares";

// ADMIN ROUTERS
import adminRouter from "./lib/admin";

// API ROUTERS
import apiRouter from "./lib/api";

// LOGIN ROUTERS
import loginRouter from "./lib/web/login";

// WEB ROUTERS
import webRouter from "./lib/web";
import { IAlerts } from "../utils/lib/alert";

const ApiBaseUrl: string = configs.API_BASE_URL;

const router: Router = Router();

// API
router.use(`${ApiBaseUrl}`, tokenValidation, apiRouter);

// ADMIN
router.use("/admin", isAuthenticated, isAdmin, adminRouter);

// LOGIN
router.use("/", setAlerts, loginRouter);

// WEB
router.get("/", setAlerts, (req: Request, res: Response) => {
    const alerts: IAlerts = res.locals.alerts;
    const data = {
        user: res.locals.user,
        alert: alerts.error,
        success: alerts.success,
    };
    return res.status(200).render("pages/home", data);
});

router.use("/", isAuthenticated, setAlerts, webRouter);

// EASTER EGGGGS
router.get("/jen", (req: Request, res: Response) => {
    return res.status(200).send("i love you, jen <3");
});

export default router;
