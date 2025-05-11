import { Router } from "express";
import {
  signInOrSignUp,
  deleteUserById,
  refreshTokenUpdate,
  logout,
  googleCallback,
  getMyDate
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";
import { backendTokenMiddleware } from "../middleware/backendToken.middleware.js";
import passport from "passport";

const router = Router();
const LoginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("image").notEmpty().withMessage("Image is required"),
];
router
  .get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),
    tryCatchHandler(googleCallback)
  )
  .get("/me" ,tryCatchHandler(authMiddleware),tryCatchHandler(getMyDate))
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
