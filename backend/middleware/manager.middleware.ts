import { NextFunction, Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { ROLES } from "../constants/Roles.js";

// middleware to check if the user is login and the token is valid
const managerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user.role?.toLocaleLowerCase() !== ROLES.MANAGER) {
    res
      .status(403)
      .json(responseFailedHandler(403, "Forbidden to access this resource"));
    return;
  }
  next();
};
export { managerMiddleware };
