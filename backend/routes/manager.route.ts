import { Router } from "express";
import { managerMiddleware } from "../middleware/manager.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import {
  getAllUsers,
  updateUserRole,
} from "../controller/manager.controller.js";

const router = Router();

router.use(
  "/",
  tryCatchHandler(authMiddleware),
  tryCatchHandler(managerMiddleware)
);

router
  .post("/update-user-role", tryCatchHandler(updateUserRole))
  .get("/get-all-users", tryCatchHandler(getAllUsers));

export { router as managerRouter };
