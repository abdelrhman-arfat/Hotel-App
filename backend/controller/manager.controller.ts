import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { TRoles } from "../utils/types/Roles.js";
import { ROLES } from "../constants/Roles.js";
import returnSkip from "../utils/func/ReturnSkip.js";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

const updateUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(responseFailedHandler(400, errors.array()[0].msg));
    return;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  if (!user) {
    res.status(404).json(responseFailedHandler(404, "user not found"));
    return;
  }

  res
    .status(200)
    .json(responseSuccessfulHandler("update user role success", 200, null));
};
const getAllUsers = async (req: Request, res: Response) => {
  const { role, email, page = 1, limit = 50, orderBy } = req.query;
  const skip = returnSkip(+page, +limit);
  let filter: {
    role?: string;
    email?: RegExp;
  } = {};

  if (role && [ROLES.CUSTOMER, ROLES.MANAGER].includes(role as string)) {
    filter.role = role as string;
  }
  if (email && email.toString().trim().length > 0) {
    filter.email = new RegExp(email.toString().trim(), "i");
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: filter?.role as TRoles | undefined,
        email: filter.email ? { contains: filter.email.source } : undefined,
      },
      select: {
        id: true,
        full_name: true,
        image: true,
        email: true,
        role: true,
      },
      ...(orderBy?.toString().trim()?.length && {
        orderBy: {
          email: orderBy === "asc" ? "asc" : "desc",
        },
      }),
      skip,
      take: Number(limit),
    }),
    prisma.user.count(),
  ]);

  res.status(200).json(
    responseSuccessfulHandler("get all users success", 200, {
      data: users,
      totalPage: Math.ceil(total / +limit),
      page: Number(page),
    })
  );
};
// get analytics ('users count' , 'best rooms' , 'earned money from reservations' , family count)
const getAnalytics = async (req: Request, res: Response) => {};

export { updateUserRole, getAnalytics, getAllUsers };
