import { Router, Request, Response } from "express";
import passport from "passport";
import { getLogin, getSignUp } from "../../../controllers/web/login";

const router: Router = Router();

router.get("/login/facebook", (req: Request, res: Response) => res.redirect("/auth/facebook"));
router.get("/login/google", (req: Request, res: Response) => res.redirect("/auth/google"));
router.get("/login", getLogin);
router.post("/login", passport.authenticate("local", {
    // successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
}), (req, res) => {
    if (req.originalUrl === "/login") {
        return res.redirect("/profile");
    }
    return res.redirect(req.originalUrl);
});

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

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        // successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req: Request, res: Response) => res.redirect("/"),
);
router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile"],
}));

// facebook
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req: Request, res: Response) => res.redirect("/profile"),
);
router.get("/auth/facebook", passport.authenticate("facebook"));

export default router;
