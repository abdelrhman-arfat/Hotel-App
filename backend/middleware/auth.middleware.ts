import { NextFunction, Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/func/JwtTokens.js";
import { JWT_SECRET } from "../constants/Env.js";
const prisma = new PrismaClient();
declare global {
  namespace Express {
    interface Request {
      user: {
        id?: number;
        email?: string;
        role?: string;
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
  const token = req.cookies["backendToken"];
  if (!token) {
    res.status(401).json(responseFailedHandler(401, "Please login first"));
    return;
  }
  const userId = verifyToken(token, JWT_SECRET as string);

  const user = await prisma.user.findUnique({
    where: { id: +userId },
    select: {
      id: true,
      role: true,
      email: true,
    },
  });

  if (!user) {
    res.status(401).json(responseFailedHandler(401, "Please login first"));
    return;
  }
  req.user = {
    role: user.role.toLowerCase(),
    email: user.email,
    id: user.id,
  };
  next();
};
export { authMiddleware };
