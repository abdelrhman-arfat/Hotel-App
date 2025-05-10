import { Router } from "express";
import { managerMiddleware } from "../middleware/manager.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import {
  getAllUsers,
  getAnalytics,
  updateUserRole,
} from "../controller/manager.controller.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";

const router = Router();

const updateRoleValidation = [
  body("userId").notEmpty().withMessage("user id is required"),
  body("role").notEmpty().withMessage("role is required"),
];

router.use(tryCatchHandler(authMiddleware), tryCatchHandler(managerMiddleware));

router
  .post(
    "/update-user-role",
    updateRoleValidation,
    tryCatchHandler(handleValidationErrors),
    tryCatchHandler(updateUserRole)
  )
  .get("/get-all-users", tryCatchHandler(getAllUsers))
  .get("/analytics", tryCatchHandler(getAnalytics));

export { router as managerRouter };
