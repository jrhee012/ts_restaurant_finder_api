import { Router } from "express";
import { downloadSuggestions } from "../../../controllers/api/search-suggestions-controllers";

const router: Router = Router();

router.get("/download", downloadSuggestions);

export default router;