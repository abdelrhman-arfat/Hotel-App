import { Request, Response } from "express";

import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";

import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";

import { PrismaClient } from "@prisma/client";

import { sendEmail } from "../utils/func/sendEmail.js";

import { returnMessageDesign } from "../utils/func/ReturnMessageDesign.js";
import { createRefreshToken, createToken } from "../utils/func/JwtTokens.js";
import { NODE_ENV } from "../constants/Env.js";
import {
  refreshTokenExpire,
  SameSiteToken,
  tokenExpire,
} from "../constants/TokenCookiesSetting.js";

const prisma = new PrismaClient();
// first chick the token from the clint side
const signInOrSignUp = async (req: Request, res: Response) => {
  const { email, fullName, image } = req.body;
  console.log(email, fullName, image);
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExist) {
    const user = await prisma.user.create({
      data: {
        email,
        full_name: fullName,
        image,
        role: "customer",
      },
    });
    const token = createToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    res.cookie("backendToken", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: SameSiteToken,
      maxAge: tokenExpire,
    });

    res.cookie("backendRefreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: SameSiteToken,
      maxAge: refreshTokenExpire,
    });

    await sendEmail(
      user,
      returnMessageDesign(
        `Hello in our Hotel ${user.full_name}`,
        `Welcome in our service and we will happy to have you in our hotel`,
        "we wish you have nice time"
      ),
      "Hello in hotel project"
    );
    return res.status(200).json(
      responseSuccessfulHandler(" sign up success ", 200, {
        data: {
          id: user.id,
          role: user.role,
        },
      })
    );
  }
  const token = createToken(userExist.id);
  const refreshToken = createRefreshToken(userExist.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: SameSiteToken,
    maxAge: tokenExpire,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: SameSiteToken,
    maxAge: refreshTokenExpire,
  });

  return res.status(200).json(
    responseSuccessfulHandler(" sign up success ", 200, {
      data: {
        id: userExist.id,
        role: userExist.role,
      },
    })
  );
};

const deleteUserById = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user.id?.toString()) {
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

export { signInOrSignUp, deleteUserById };
