import { Router } from "express";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { employeeMiddleware } from "../middleware/employee.middleware.js";
import { clerkMiddleware } from "@clerk/express";

const router = Router();

router.use(
  clerkMiddleware(),
  tryCatchHandler(authMiddleware),
  tryCatchHandler(employeeMiddleware)
);

export { router as managerRouter };
