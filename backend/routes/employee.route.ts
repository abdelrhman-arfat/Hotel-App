import { Router } from "express";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { employeeMiddleware } from "../middleware/employee.middleware.js";

const router = Router();

router.use(
  tryCatchHandler(authMiddleware),
  tryCatchHandler(employeeMiddleware)
);

export { router as managerRouter };
