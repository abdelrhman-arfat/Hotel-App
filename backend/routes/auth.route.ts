import { Router } from "express";
import {
  signInOrSignUp,
  deleteUserById,
  refreshTokenUpdate,
  logout,
  googleCallback,
  getMyDate,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import passport from "passport";

const router = Router();
// const LoginValidation = [
//   body("email").isEmail().withMessage("Invalid email"),
//   body("fullName").notEmpty().withMessage("Full name is required"),
// ];
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
  .get("/me", tryCatchHandler(authMiddleware), tryCatchHandler(getMyDate))

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
