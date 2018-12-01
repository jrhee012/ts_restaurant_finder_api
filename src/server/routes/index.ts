import { Router, Request, Response } from "express";
import passport from "passport";
import restaurants from "./lib/api/restaurants";
import data from "./lib/api/data";
import configs from "../config";
import profileRouter from "./lib/web/profile";
import restaurantsRouter from "./lib/web/restaurants";
import { getLogin, getSignUp } from "../controllers/web/login";
import { isAuthenticated } from "../config/passport";

const ApiBaseUrl: string = configs.BASE_URL;

let router: Router;
router = Router();

router.get("/", (req: Request, res: Response) => {
    const data = { user: res.locals.user };
    // console.log('session', req.session)
    return res.status(200).render("pages/home", data);
});

router.use("/profile", isAuthenticated, profileRouter);
router.use("/restaurants", restaurantsRouter);

// LOGIN ============================================================
router.get("/login/facebook", (req: Request, res: Response) => res.redirect("/auth/facebook"));
router.get("/login/google", (req: Request, res: Response) => res.redirect("/auth/google"));
router.get("/login", getLogin);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}));

router.get("/logout", (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
});

router.get("/signup", getSignUp);
router.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
}));

// GOOGLE AUTH
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req: Request, res: Response) => {
        // console.log("!!!!!")
        return res.send(200);
    },
);
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile"],
}));

// facebook
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req: Request, res: Response) => {
        console.log("!!!!!");
        return res.redirect("/profile");
    },
);
router.get("/auth/facebook", passport.authenticate("facebook"));

// API===============================================================
router.use(`${ApiBaseUrl}/restaurants`, restaurants);
router.use(`${ApiBaseUrl}/data`, data);

// EASTER EGGGGGSSSS
router.get("/jen", (req: Request, res: Response) => {
    return res.status(200).send("i love you, jen <3");
});

export default router;
