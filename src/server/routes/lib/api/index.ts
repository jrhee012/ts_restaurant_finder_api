import { Router } from "express";
import restaurants from "./restaurants";
import data from "./data";
import searchSuggestion from "./search-suggestion";
import users from "./users";

const router: Router = Router();

router.use("/restaurants", restaurants);
router.use("/data", data);
router.use("/search_suggestions", searchSuggestion);
router.use("/users", users);

export default router;
