import { NextFunction, Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/func/JwtTokens.js";
import { JWT_SECRET } from "../constants/Env.js";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
        role: string;
        image?: string;
        fullname: string;
        bkToken?: string;
        bkRefreshToken?: string;
        GoogleToken?: string;
        GoogleRfToken?: string;
      };
      auth: {
        userId: string;
      };
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.backendToken;
  const message = "login first and try again";
  if (!token || token === "") {
    res.clearCookie("backendToken");
    res.clearCookie("backendRefreshToken");
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }

  const decoded = verifyToken(token, JWT_SECRET as string) as JwtPayload;
  if (!decoded) {
    res.clearCookie("backendToken");
    res.clearCookie("backendRefreshToken");
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      role: true,
      image: true,
      email: true,
      full_name: true,
    },
  });

  if (!user) {
    res.clearCookie("backendToken");
    res.clearCookie("backendRefreshToken");
    res.status(401).json(responseFailedHandler(401, message));
    return;
  }
  req.user = {
    role: user.role.toLowerCase(),
    email: user.email,
    id: user.id,
    image: user.image,
    fullname: user.full_name,
  };
  next();
};
export { authMiddleware };
