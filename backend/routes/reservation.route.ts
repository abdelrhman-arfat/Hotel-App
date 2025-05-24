import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import {
  createReservation,
  createStripeSession,
  getMyReservations,
  getReservationById,
  getReservationByReservationEmailId,
  getReservationsBuyIsActive,
  getReservationsByRoom,
  getUserReservations,
} from "../controller/reservation.controller.js";
import { employeeMiddleware } from "../middleware/employee.middleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";

const reservationValidation = [
  body("roomId").notEmpty().withMessage("Room ID is required"),
  body("totalDays")
    .notEmpty()
    .withMessage("Total days is required")
    .isInt({ min: 1 })
    .withMessage("Total days must be at least 1"),
];

const router = Router();

router.use(tryCatchHandler(authMiddleware));

router
  .post(
    "/create-stripe-session",
    reservationValidation,
    tryCatchHandler(handleValidationErrors),
    tryCatchHandler(createStripeSession)
  )
  .post(
    "/",

    tryCatchHandler(createReservation)
  )
  .get("/me", tryCatchHandler(getMyReservations));

router
  .get(
    "/all",
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getReservationsBuyIsActive)
  )
  .get(
    "/get-by-reservation-email-id",
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getReservationByReservationEmailId)
  )
  .get(
    "/get-by-id/:reservationId",
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getReservationById)
  )
  .get(
    "/get-by-room/:roomId",
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getReservationsByRoom)
  )
  .get(
    "/get-by-user",
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getUserReservations)
  );

export { router as reservationRouter };
