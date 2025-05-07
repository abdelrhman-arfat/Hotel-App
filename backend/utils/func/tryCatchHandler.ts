import { Request, Response, NextFunction } from "express";
import catchHandler from "./catchHandler.js";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const tryCatchHandler = (fn: AsyncController): AsyncController => {
  return async (req: Request, res: Response, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      return res.status(500).json(catchHandler(err, 500));
    }
  };
};

export default tryCatchHandler;
