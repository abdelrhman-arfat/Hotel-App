import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";

const router = Router();

router.use(tryCatchHandler(authMiddleware));

export { router as reviewRouter };
