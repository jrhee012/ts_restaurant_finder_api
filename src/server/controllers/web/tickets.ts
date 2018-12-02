import { Request, Response } from "express";
import _concat from "lodash/concat";
import paginate from "jw-paginate";
import { Tickets } from "../../models";
import { TicketsModel } from "../../models/lib/Tickets";

export const getAll = async (req: Request, res: Response) => {
    try {
        const user = res.locals.user;
        const sellTickets: TicketsModel[] = await Tickets.find({
            seller_id: res.locals.user._id,
        });
        const buyTickets: TicketsModel[] = await Tickets.find({
            buyer_id: res.locals.user._id,
        });

        const tickets: TicketsModel[] = _concat(sellTickets, buyTickets);

        const pageNum: number = req.query.page || 1;

        const data = {
            user: user,
            tickets: tickets,
            page: paginate(tickets.length, pageNum, 20, 10),
        };
        return res.status(200).render("pages/tickets/index", data);
    } catch (e) {
        console.log("ERROR tickets get all controller");
        console.error(e.message);
        return res.redirect(req.originalUrl);
    }
};
