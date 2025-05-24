import { Request, Response } from "express";

import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";

import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";

import { PrismaClient } from "@prisma/client";

import { createToken, verifyToken } from "../utils/func/JwtTokens.js";
import { CLIENT_URL, NODE_ENV, REFRESH_SECRET } from "../constants/Env.js";
import {
  refreshTokenExpire,
  SameSiteToken,
  tokenExpire,
} from "../constants/TokenCookiesSetting.js";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const googleCallback = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user || !user.bkToken || !user.bkRefreshToken) {
    return res.redirect("/login");
  }
  res.cookie("backendToken", user.bkToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: SameSiteToken,
    maxAge: tokenExpire,
  });

  res.cookie("backendRefreshToken", user.bkRefreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: SameSiteToken,
    maxAge: refreshTokenExpire,
  });

  res.redirect(`${CLIENT_URL}/success`);
};

const deleteUserById = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user.id) {
    res.status(401).json(responseFailedHandler(401, "unauthorized"));
    return;
  }
  const deletedUssr = await prisma.user.delete({
    where: { id: user.id },
  });
  if (!deletedUssr) {
    res.status(404).json(responseFailedHandler(404, "user not found"));
    return;
  }

  res
    .status(200)
    .json(responseSuccessfulHandler("delete user success", 200, null));
};

const refreshTokenUpdate = async (req: Request, res: Response) => {
  const user = req.user;

  const refreshToken = req.cookies.backendRefreshToken;

  if (!refreshToken) {
    res.clearCookie("backendToken");
    res.clearCookie("backendRefreshToken");
    res.status(401).json(responseFailedHandler(401, "unauthorized"));
    return;
  }

  if (!REFRESH_SECRET) {
    throw new Error("REFRESH_SECRET is not defined");
  }

  const decoded = verifyToken(refreshToken, REFRESH_SECRET) as JwtPayload;
  if (!decoded || user.id !== decoded.id) {
    res.clearCookie("backendToken");
    res.clearCookie("backendRefreshToken");
    res.status(401).json(responseFailedHandler(401, "unauthorized"));
    return;
  }

  const token = createToken(user.id);

  res.cookie("backendToken", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: SameSiteToken,
    maxAge: tokenExpire,
  });
  res.status(200).json(
    responseSuccessfulHandler("refresh token success", 200, {
      data: user,
    })
  );
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("backendToken");
  res.clearCookie("backendRefreshToken");
  res.status(200).json(responseSuccessfulHandler("logout success", 200, null));
};

const getMyDate = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user.id) {
    res.status(401).json(responseFailedHandler(401, "unauthorized"));
    return;
  }

  res.status(200).json(
    responseSuccessfulHandler("get my date success", 200, {
      data: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        image: user.image,
        role: user.role,
      },
    })
  );
};
export {
  getMyDate,
  logout,
  deleteUserById,
  refreshTokenUpdate,
  googleCallback,
};
