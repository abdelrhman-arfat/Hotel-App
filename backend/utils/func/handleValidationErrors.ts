import { validationResult } from "express-validator";
import responseFailedHandler from "../types/response/responseFailedHandler.js";
import { NextFunction, Request, Response } from "express";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseFailedHandler(400, errors.array()[0].msg));
  }
  next();
};

export { handleValidationErrors };
