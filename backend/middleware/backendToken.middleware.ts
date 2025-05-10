import { NextFunction, Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { verifyToken } from "../utils/func/JwtTokens.js";
import { CLIENT_SCREE_JWT, SECRET } from "../constants/Env.js";
import { JwtPayload } from "jsonwebtoken";

export const backendTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  const message = "You can't access this service";
  if (!authorization) {
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }
  const token = authorization.split(" ")[1];
  if (!token.trim()) {
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }

  if (!CLIENT_SCREE_JWT?.trim()) {
    return new Error(" JWT is required");
  }

  const decoded = verifyToken(token.trim(), CLIENT_SCREE_JWT) as JwtPayload;
  if (!decoded || decoded?.secret !== SECRET) {
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }
  next();
};
