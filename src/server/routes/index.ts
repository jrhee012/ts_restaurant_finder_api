import { Router, Application, Request, Response } from "express";
import passport from "passport";
// import api from "./lib/api";
import restaurants from "./lib/api/restaurants";
import data from "./lib/api/data";
import configs from "../config";
import { redisClient } from "../utils";
import profileControllers from "./lib/web/profile";
import { getLogin, getSignUp } from "../controllers/web/login";

const ApiBaseUrl: string = configs.BASE_URL;

let router: Router;
router = Router();

router.get("/", (req, res) => {
    const data = { user: res.locals.user };
    // console.log('session', req.session)
    return res.status(200).render("pages/home", data);
});

router.use("/profile", profileControllers);

// LOGIN ============================================================
router.get("/login/facebook", (req, res) => res.redirect("/auth/facebook"));
router.get("/login/google", (req, res) => res.redirect("/auth/google"));
router.get("/login", getLogin);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}));

router.get("/logout", (req, res) => {
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
    (req, res) => {
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
    (req, res) => {
        console.log("!!!!!")
        return res.redirect("/profile");
    },
);
router.get("/auth/facebook", passport.authenticate("facebook"));

// API===============================================================
router.use(`${ApiBaseUrl}/restaurants`, restaurants);
router.use(`${ApiBaseUrl}/data`, data);

export default router;
