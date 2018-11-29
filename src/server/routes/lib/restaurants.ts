import { Router } from "express";
import { index as restaurantControllersIndex } from "../../controllers/restaurants-controllers";

let router: Router;
router = Router();

router.get("/", restaurantControllersIndex);

export default router;
