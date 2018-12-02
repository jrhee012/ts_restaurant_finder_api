import { PassportStatic } from "passport";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth2";
// import passportFacebook from "passport-facebook";
import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { Users } from "../models";
import configs from "../config";

const LocalStrategy = passportLocal.Strategy;
// const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

export default (passport: PassportStatic) => {
    passport.serializeUser(function (user: any, done) {
        done(undefined, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user: any) {
            done(err, user);
        });
    });

    /**
     * Sign in using Email and Password.
     */
    passport.use(new LocalStrategy(
        { passReqToCallback: true },
        async function (req, email, password, done) {
            try {
                const user = await Users.findOne({ "local.email": email });

                if (!user) {
                    return done(undefined, false, req.flash("error", "Incorrect username."));
                }

                if (!user.validatePassword(password)) {
                    return done(undefined, false, req.flash("error", "Incorrect password."));
                }

                user.last_login_at = new Date().toISOString();
                await user.save();
                return done(undefined, user);
            } catch (e) {
                console.error(e.message);
                return done(undefined, false, req.flash("error", e.message));
            }
        }
    ));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use("local-signup", new LocalStrategy(
        { passReqToCallback: true },
        async function (req, email, password, done) {
            try {
                let user = await Users.findOne({ "local.email": email });

                if (user) {
                    return done(undefined, false, req.flash("error", "That email is already taken."));
                }

                user = new Users();
                user.local.email = email;
                user.setPassword(password);
                user.created_at = new Date().toISOString();
                user.last_login_at = new Date().toISOString();
                await user.save();

                return done(undefined, user);
            } catch (e) {
                console.error(e.message);
                return done(undefined, false, req.flash("error", e.message));
            }
        })
    );

    // =========================================================================
    // GOOGLE LOGIN ============================================================
    // =========================================================================

    passport.use(new GoogleStrategy(
        {
            clientID: configs.GOOGLE_CLIENT_ID,
            clientSecret: configs.GOOGLE_CLIENT_SECRET,
            callbackURL: configs.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        async function (req, accessToken, refreshToken, profile, done) {
            try {
                let user = await Users.findOne({ "google.id": profile.id });

                if (!user) {
                    const googleResp = {
                        id: profile.id,
                        token: accessToken,
                        email: profile.email,
                        name: profile.name,
                        full_profile: profile,
                    };
                    user = new Users();
                    user.google = googleResp;
                    user.last_login_at = new Date().toISOString();

                    const savedUser = await user.save();
                    return done(undefined, savedUser, req.flash("success", "Log in successful!"));
                }
                user.last_login_at = new Date().toISOString();
                await user.save();
                done(undefined, user, req.flash("success", "Log in successful!"));
            } catch (e) {
                console.log("google login error");
                console.error(e);
                return done(undefined, false, req.flash("error", e.message));
            }
        }
    ));
};

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};

/**
 * Admin Required middleware
 */
export let isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const check = user.isAdmin();
    if (!check) {
        res.redirect("/");
    }
    next();
};
