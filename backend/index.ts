import express from "express";
import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route.js";
import { roomRouter } from "./routes/room.route.js";
import { reservationRouter } from "./routes/reservation.route.js";
import { managerRouter } from "./routes/manager.route.js";
import { reviewRouter } from "./routes/review.route.js";
import { CLIENT_URL, PORT } from "./constants/Env.js";
import responseFailedHandler from "./utils/types/response/responseFailedHandler.js";
import "./lib/config/passport.js";
import cron from "node-cron";
import checkAndUpdateReservations from "./utils/func/UpdateReservationActivation.js";
export const app = express();
const allowedOrigins = CLIENT_URL || "http://localhost:3000";

// Automation ot update the reservation activation status
// minutes hours day month dayOfWeek
cron.schedule("41 3 * * *", () => {
  console.log("running a task every day at 3:18am");
  checkAndUpdateReservations();
});

app.use(helmet());
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter);
app.use("/api/manager", managerRouter);
app.use("/api/employee", managerRouter);
app.use("/api/reservation", reservationRouter);

app.use((_, res) => {
  res
    .status(404)
    .json(responseFailedHandler(404, "this resource not found not found"));
  return;
});

app.listen(PORT || 3002, () => {
  console.log(`server is running in port ${PORT || 3002}`);
});
