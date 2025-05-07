import { Router } from "express";
import {
  signInOrSignUp,
  deleteUserById,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { body } from "express-validator";
import { checkAuthorization } from "../middleware/checkAuthorization.js";

const router = Router();
const LoginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("image").notEmpty().withMessage("Image is required"),
];
router
  .post(
    "/login-signup",
    LoginValidation,
    tryCatchHandler(checkAuthorization),
    tryCatchHandler(signInOrSignUp)
  )

  .delete(
    "/delete-account",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(deleteUserById)
  );
export { router as authRouter };
