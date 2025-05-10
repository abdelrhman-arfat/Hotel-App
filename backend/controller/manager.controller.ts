import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { TRoles } from "../utils/types/Roles.js";
import { ROLES } from "../constants/Roles.js";
import returnSkip from "../utils/func/ReturnSkip.js";

const prisma = new PrismaClient();

const updateUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body;

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
  const {
    role,
    email,
    orderBy,
  }: {
    role?: TRoles;
    email?: string;
    orderBy?: string;
  } = req.query;
  const [skip, limit] = returnSkip(req);
  let filter: {
    role?: string;
    email?: RegExp;
  } = {};

  if (role && [ROLES.CUSTOMER, ROLES.MANAGER].includes(role as string)) {
    filter.role = role as string;
  }
  if (email && email.trim().length > 0) {
    filter.email = new RegExp(email.trim(), "i");
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
      ...(orderBy?.trim()?.length && {
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
    })
  );
};
// get analytics ('users count' , 'best rooms' , 'earned money from reservations' , family count)
const getAnalytics = async (req: Request, res: Response) => {
  const [users, rooms, reservations, earnedMoney, allReservations] =
    await Promise.all([
      prisma.user.count(),
      prisma.room.count(),
      prisma.reservation.count(),
      prisma.reservation.aggregate({
        _sum: {
          total_price: true,
        },
      }),
      prisma.reservation.findMany({
        select: {
          total_price: true,
          start_date: true,
        },
      }),
    ]);

  const monthlyMap: Record<string, number> = {};

  for (const res of allReservations) {
    const date = new Date(res.start_date);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const label = `${month} ${year}`;

    monthlyMap[label] = (monthlyMap[label] || 0) + Number(res.total_price);
  }

  // Convert to chart-friendly array
  const chartEarnedMonth = Object.entries(monthlyMap).map(([label, value]) => ({
    label,
    value,
  }));

  const data = {
    users,
    rooms,
    reservations,
    money: earnedMoney._sum.total_price?.toFixed(4),
    chartEarnedMonth,
  };

  res.status(200).json(
    responseSuccessfulHandler("Analytics is created successfully", 200, {
      data,
    })
  );
};

export { updateUserRole, getAnalytics, getAllUsers };
