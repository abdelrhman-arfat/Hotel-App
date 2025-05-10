import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import tryCatchHandler from "../utils/func/tryCatchHandler.js";
import { employeeMiddleware } from "../middleware/employee.middleware.js";
import {
  getAllRooms,
  getRoomById,
  getFeaturedRooms,
  createRoom,
  updateRoom,
  updateRoomImage,
  deleteRoom,
} from "../controller/room.controller.js";
import { body } from "express-validator";
import { upload } from "../lib/config/Cloudinary.js";
import { handleValidationErrors } from "../utils/func/handleValidationErrors.js";
const router = Router();

const validateCreateRoom = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("familyCount").notEmpty().withMessage("Max people is required"),
  body("roomsCount").notEmpty().withMessage("Room count is required"),
];

router
  .get("/", tryCatchHandler(getAllRooms))
  .get("/get-room/:roomId", tryCatchHandler(getRoomById))
  .get("/featured", tryCatchHandler(getFeaturedRooms));

router
  .post(
    "/",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    validateCreateRoom,
    tryCatchHandler(handleValidationErrors),
    upload.single("main_image"),
    upload.array("images"),
    tryCatchHandler(createRoom)
  )
  .put(
    "/:roomId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(updateRoom)
  )
  .put(
    "/images/:imageId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    upload.single("image"),
    tryCatchHandler(updateRoomImage)
  )
  .delete(
    "/:roomId",
    tryCatchHandler(authMiddleware),
    tryCatchHandler(employeeMiddleware),
    tryCatchHandler(deleteRoom)
  );

export { router as roomRouter };
