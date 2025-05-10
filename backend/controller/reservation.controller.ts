import { Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import { PrismaClient } from "@prisma/client";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import { sendEmail } from "../utils/func/sendEmail.js";
import { returnMessageDesign } from "../utils/func/ReturnMessageDesign.js";
import { ReservationMessage } from "../utils/email/reservationMessage.js";
import returnSkip from "../utils/func/ReturnSkip.js";
import { emailRegEx } from "../constants/ReqEx.js";

const prisma = new PrismaClient();

const createReservation = async (req: Request, res: Response) => {
  /*
  first check the payment functionality or not
    const payment = await paymentService.payment(req.body);
    if !payment will return can't create this service or can't continue else i will continue

  if (payment) {
    res
      .status(400)
      .json(responseFailedHandler(400, "payment failed try again later"));
    return;
  }
  */

  const user = req.user;
  const { roomId, startDay, totalDays } = req.body;
  const startDate = new Date(startDay);
  const endDate = new Date(
    startDate.getTime() + totalDays * 24 * 60 * 60 * 1000
  );
  if (
    startDate.getTime() < new Date().getTime() ||
    endDate.getTime() < startDate.getTime()
  ) {
    res.status(400).json(responseFailedHandler(400, "the date is not valid"));
    return;
  }

  const room = await prisma.room.findUnique({
    where: { id: parseInt(roomId) },
  });

  if (!room) {
    res.status(404).json(responseFailedHandler(404, "room not found"));
    return;
  }
  const overlappingReservationsCount = await prisma.reservation.count({
    where: {
      room_id: parseInt(roomId),
      NOT: {
        OR: [
          { end_date: { lte: startDate } }, // ends before new starts
          { start_date: { gte: endDate } }, // starts after new ends
        ],
      },
    },
  });

  if (overlappingReservationsCount >= room.room_count) {
    res
      .status(400)
      .json(
        responseFailedHandler(400, "room is not available in this date range")
      );
    return;
  }

  const reservation = await prisma.reservation.create({
    data: {
      is_active: startDate >= new Date(),
      days_count: +totalDays,
      user_id: user.id,
      room_id: roomId,
      start_date: new Date(startDay),
      total_price: +room.price_per_day * +totalDays,
      end_date: new Date(
        new Date(startDay).getTime() + totalDays * 24 * 60 * 60 * 1000
      ),
    },
  });
  const [header, body, footer] = ReservationMessage(
    user.name,
    reservation.id,
    user.id,
    room.id,
    room.title,
    totalDays,
    +room.price_per_day,
    endDate,
    startDay
  );
  await sendEmail(
    user,
    returnMessageDesign(header, body, footer),
    "reservation created"
  );

  res.status(201).json(
    responseSuccessfulHandler("reservation created successfully", 201, {
      data: reservation,
    })
  );
};

const getMyReservations = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  if (!userId) {
    res.status(401).json(responseFailedHandler(401, "user not authorized"));
    return;
  }

  const [skip, limit] = returnSkip(req);

  const [reservations, totalReservation] = await Promise.all([
    prisma.reservation.findMany({
      take: limit,

      skip,
      where: { user_id: userId },
      include: {
        room: {
          select: {
            title: true,
            price_per_day: true,
            main_image: true,
          },
        },
      },
      orderBy: {
        end_date: "desc",
      },
    }),
    prisma.reservation.count({
      where: { user_id: userId },
    }),
  ]);

  if (!reservations) {
    res.status(404).json(responseFailedHandler(404, "reservations not found"));
  }
  res.status(200).json(
    responseSuccessfulHandler("User Reservations fetched successfully ", 200, {
      data: reservations,
      totalPages: Math.ceil(totalReservation / limit),
    })
  );
};

const getReservationById = async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const { reservationId } = req.params;

  if (!reservationId) {
    res
      .status(400)
      .json(responseFailedHandler(400, "reservation id is required"));
    return;
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: parseInt(reservationId), user_id: userId },
    include: {
      room: {
        select: {
          title: true,
          main_image: true,
          price_per_day: true,
        },
      },
      user: {
        select: {
          full_name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!reservation) {
    res.status(404).json(responseFailedHandler(404, "reservation not found"));
    return;
  }

  res.status(200).json(
    responseSuccessfulHandler("reservation found successfully", 200, {
      data: reservation,
    })
  );
};

const getReservationByReservationEmailId = async (
  req: Request,
  res: Response
) => {
  const {
    reservationId,
    userEmail,
  }: {
    reservationId?: string;
    userEmail?: string;
  } = req.query;
  if (!reservationId || typeof reservationId !== "string") {
    return res
      .status(400)
      .json(responseFailedHandler(400, "reservation id is required"));
  }
  if (!userEmail || !emailRegEx.test(userEmail)) {
    res.status(400).json(responseFailedHandler(400, "the email is not valid"));
  }
  //{roomId}-${userId}-${ endDay } -> '1-1-1'-2025-2-4
  const [roomId, userId, resId] = reservationId?.split("-");
  const failedMessage = "this id isn't true please add true id and try again";
  if (
    !roomId ||
    isNaN(+roomId) ||
    !userId ||
    isNaN(+userId) ||
    !resId ||
    isNaN(+resId)
  ) {
    res.status(404).json(responseFailedHandler(404, failedMessage));
    return;
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: +resId,
      user_id: +userId,
      room_id: +roomId,
      user: {
        email: userEmail,
      },
    },
    include: {
      room: {
        select: {
          title: true,
          main_image: true,
          price_per_day: true,
        },
      },
    },
  });

  if (!reservation) {
    res.status(404).json(responseFailedHandler(404, failedMessage));
    return;
  }
  res.status(200).json(
    responseSuccessfulHandler("the reservation id is", 200, {
      data: reservation,
    })
  );
};

const getReservationsByRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  if (!roomId || isNaN(+roomId)) {
    res.status(400).json(responseFailedHandler(400, "room id is required"));
  }

  const [skip, limit] = returnSkip(req);

  const [reservations, totalReservation] = await Promise.all([
    prisma.reservation.findMany({
      take: limit,
      skip,
      where: {
        room_id: parseInt(roomId),
      },
      include: {
        room: {
          select: {
            title: true,
            price_per_day: true,
            main_image: true,
          },
        },
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
    }),
    prisma.reservation.count({
      where: {
        room_id: parseInt(roomId),
      },
    }),
  ]);

  if (!reservations) {
    res.status(404).json(responseFailedHandler(404, "reservation not found"));
    return;
  }

  res.status(200).json(
    responseSuccessfulHandler("reservation found successfully", 200, {
      data: reservations,
      totalPages: Math.ceil(totalReservation / limit),
    })
  );
};

const getUserReservations = async (req: Request, res: Response) => {
  const [skip, limit] = returnSkip(req);
  const {
    userEmail,
  }: {
    userEmail?: string;
  } = req.query;
  if (!userEmail || !emailRegEx.test(userEmail)) {
    res.status(400).json(responseFailedHandler(400, "user Email is required"));
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    res.status(404).json(responseFailedHandler(404, "user not found"));
    return;
  }

  const [reservations, totalReservation, allUserPayments] = await Promise.all([
    prisma.reservation.findMany({
      take: limit,
      skip,
      where: {
        user: {
          email: userEmail,
        },
      },
      include: {
        user: {
          select: {
            full_name: true,
            image: true,
          },
        },
        room: {
          select: {
            title: true,
            main_image: true,
            price_per_day: true,
          },
        },
      },
      orderBy: {
        end_date: "desc",
      },
    }),
    prisma.reservation.count({
      where: {
        user: {
          email: userEmail,
        },
      },
    }),
    prisma.reservation.aggregate({
      where: {
        user: {
          email: userEmail,
        },
      },
      _sum: {
        total_price: true,
      },
    }),
  ]);

  if (!reservations) {
    res.status(404).json(responseFailedHandler(404, "reservations not found"));
  }
  res.status(200).json(
    responseSuccessfulHandler("User fetched successfully Reservation", 200, {
      data: reservations,
      allUserPayments: allUserPayments._sum.total_price,
      totalPages: Math.ceil(totalReservation / limit),
    })
  );
};

const getReservationsBuyIsActive = async (req: Request, res: Response) => {
  const {
    isActive,
  }: {
    isActive?: string;
  } = req.query;
  const [skip, limit] = returnSkip(req);
  const [reservations, totalReservation] = await Promise.all([
    prisma.reservation.findMany({
      take: limit,
      skip,
      ...(isActive?.trim() && {
        where: {
          is_active: isActive === "true" ? true : false,
        },
      }),
      include: {
        room: {
          select: {
            title: true,
            main_image: true,
            price_per_day: true,
          },
        },
        user: {
          select: {
            full_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        end_date: "desc",
      },
    }),
    prisma.reservation.count({
      ...(isActive?.trim() && {
        where: {
          is_active: isActive === "true" ? true : false,
        },
      }),
    }),
  ]);

  if (!reservations) {
    res.status(404).json(responseFailedHandler(404, "reservations not found"));
  }

  res.status(200).json(
    responseSuccessfulHandler("User fetched successfully Reservation", 200, {
      data: reservations,
      totalPages: Math.ceil(totalReservation / limit),
    })
  );
};

export {
  createReservation,
  getMyReservations,
  getUserReservations,
  getReservationById,
  getReservationsByRoom,
  getReservationsBuyIsActive,
  getReservationByReservationEmailId,
};
