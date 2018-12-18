import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import { ValidationsModel } from "../../models/lib/Validations";
import { Validations } from "../../models";
import { UsersModel } from "../../models/lib/Users";
import { setAlerts } from "../../utils";
import logger from "../../config/logger";

const _returnToForm = (res: Response, data: any) => {
    return res.status(400)
        .render("pages/profile/authenticate_form", data);
};

export const getProfile = async (req: Request, res: Response) => {
    const user: UsersModel = res.locals.user;
    const userId: string = user._id;

    // let url: string;
    let validation: ValidationsModel | null;
    try {
        validation = await Validations.findOne({ user_id: userId });

        if (validation === null) {
            validation = new Validations();
            await validation.createNew(userId);
            // return res.redirect("/profile");
        }
        // url = validation.url;
    } catch (e) {
        logger.error(e.message);
        req.flash("error", e.message);
        return res.redirect("/profile");
    }

    const alerts = setAlerts(req);

    const data = {
        user: user,
        validation: validation,
        alert: alerts.error,
        success: alerts.success,
    };

    return res.status(200).render("pages/profile/index", data);
};

export const getAuthenticationPage = async (req: Request, res: Response) => {
    const user: UsersModel = res.locals.user;
    // const userId: string = user._id;

    // // let url: string;
    // let validation: ValidationsModel | null;
    // try {
    //     validation = await Validations.findOne({ user_id: userId });

    //     if (validation === null) {
    //         validation = new Validations();
    //         await validation.createNew(userId);
    //         // return res.redirect("/profile");
    //     }
    //     // url = validation.url;
    // } catch (e) {
    //     logger.error(e.message);
    //     return res.redirect("/profile");
    // }
    const alerts = setAlerts(req);

    const data = {
        user: user,
        // validation: validation,
        alert: alerts.error,
        success: alerts.success,
    };

    return res.status(200).render("pages/profile/authenticate_form", data);
};

export const postAuthenticationPage = async (req: Request, res: Response) => {
    const data: {
        user: any,
        alert: string[],
    } = { user: res.locals.user, alert: [] };

    const params = req.body;

    if (params.email === undefined || params.email === null) {
        data.alert.push("Email required");
        return _returnToForm(res, data);
    }

    if (!EmailValidator.validate(params.email)) {
        data.alert.push("Invalid email");
        return _returnToForm(res, data);
    }

    if (params.password === undefined || params.password === null) {
        data.alert.push("Password required");
        return _returnToForm(res, data);
    }

    const user = res.locals.user;
    try {
        user.local.email = params.email;
        user.setPassword(params.password);
        // user.completeValidation();
        await user.save();
    } catch (e) {
        logger.error("ERROR post authenticate user profile controller");
        logger.error(e.message);
    }
    return res.redirect("/profile");
};

export const finishValidation = async (req: Request, res: Response) => {
    const url: string = `/profile${req.url}`;
    try {
        const validation: ValidationsModel | null = await Validations.findOne({
            url: url,
            user_id: res.locals.user._id,
         });

        if (validation === null || validation === undefined) {
            return res.redirect("/");
        }

        validation.completeValidation();
    } catch (e) {
        logger.error("ERROR finish validation profile controller");
        logger.error(e.message);
        return res.redirect("/");
    }

    req.flash("success", "Account validated!");
    return res.redirect("/profile");
};

export const getLinkAccountPage = (req: Request, res: Response) => {
    const data = { user: res.locals.user, alert: [] };
    return res.status(200).render("pages/profile/link_account", data);
};