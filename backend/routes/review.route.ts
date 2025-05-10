import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import {
  addReview,
  deleteReview,
  deleteReviewByEmployees,
  getAllReviews,
  getMyReviews,
  getReviewsByRoomId,
  getSomeReviews,
  updateReview,
} from "../controller/review.controller.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";
import { employeeMiddleware } from "../middleware/employee.middleware.js";

const router = Router();

const reviewValidation = [
  body("rate").isLength({ min: 1, max: 5 }),
  body("review")
    .isLength({ min: 5, max: 500 })
    .withMessage("review text is required , max 500 characters and min is 5"),
  body("reservationId").notEmpty().withMessage("reservation id is required"),
  body("roomId").notEmpty().withMessage("room id is required"),
];
const reviewUpdateValidation = [
  body("reviewId").notEmpty().withMessage("review id is required"),
];

router.get("/some-reviews", tryCatchHandler(getSomeReviews));

router
  .get("/me", tryCatchHandler(authMiddleware), tryCatchHandler(getMyReviews))
  .post(
    "/",
    tryCatchHandler(authMiddleware),
    reviewValidation,
    tryCatchHandler(handleValidationErrors),
    tryCatchHandler(addReview)
  )
  .put(
    "/update-review",
    tryCatchHandler(authMiddleware),
    reviewUpdateValidation,
    tryCatchHandler(handleValidationErrors),
    tryCatchHandler(updateReview)
  ) // review id and reviewText from the body
  .delete(
    "/delete-my-review/:reviewId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(deleteReview)
  );

router
  .get(
    "/all-reviews",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getAllReviews)
  )
  .get(
    "/by-room-id/:roomId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(getReviewsByRoomId)
  ) // roomId from the params and sort tech asc or desc with query params
  .delete(
    "/delete-review/:reviewId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(deleteReviewByEmployees)
  );

export { router as reviewRouter };
