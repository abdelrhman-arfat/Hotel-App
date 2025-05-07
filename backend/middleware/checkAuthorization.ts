import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/func/JwtTokens.js";
import { CLIENT_SCREE_JWT } from "../constants/Env.js";

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.Authorization || req.headers.authorization;
  if (!authorization || typeof authorization !== "string") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!CLIENT_SCREE_JWT) {
    return res
      .status(500)
      .json({ message: "Internal Server Error 'error with token secret' " });
  }
  const decoded = verifyToken(token, CLIENT_SCREE_JWT);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
