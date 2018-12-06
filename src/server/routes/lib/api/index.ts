import { Router } from "express";
import restaurants from "./restaurants";
import data from "./data";
import searchSuggestion from "./search-suggestion";

const router: Router = Router();

router.use("/restaurants", restaurants);
router.use("/data", data);
router.use("/search_suggestions", searchSuggestion);

export default router;
