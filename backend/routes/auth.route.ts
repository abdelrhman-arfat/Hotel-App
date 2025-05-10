import { Router } from "express";
import {
  signInOrSignUp,
  deleteUserById,
  refreshTokenUpdate,
  logout,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";
import { backendTokenMiddleware } from "../middleware/backendToken.middleware.js";

const router = Router();
const LoginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("image").notEmpty().withMessage("Image is required"),
];
router
  .post(
    "/login-signup",
    tryCatchHandler(backendTokenMiddleware),
    LoginValidation,
    tryCatchHandler(handleValidationErrors),
    tryCatchHandler(signInOrSignUp)
  )
  .post("/logout", tryCatchHandler(authMiddleware), tryCatchHandler(logout))
  .post(
    "/refresh-token",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(refreshTokenUpdate)
  )
  .delete(
    "/delete-account",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(deleteUserById)
  );
export { router as authRouter };
