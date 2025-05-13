import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import returnSkip from "../utils/func/ReturnSkip.js";

const prisma = new PrismaClient();

const validSort = (sort): boolean => {
  return sort && ["desc", "asc"].includes(sort.toString().trim());
};

const addReview = async (req: Request, res: Response) => {
  const user = req.user;

  const { rate, review, roomId, reservationId } = req.body;

  //check the room exist
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(roomId),
    },
  });

  if (!room) {
    res.status(404).json(responseFailedHandler(404, "room not found"));
    return;
  }

  // check if reservation exist
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: parseInt(reservationId),
      user_id: user?.id,
      room_id: parseInt(roomId),
    },
  });

  if (!reservation) {
    res
      .status(404)
      .json(responseFailedHandler(404, "You haven't reserved this room yet"));
    return;
  }

  // check if user already reviewed this room
  const oldReview = await prisma.review.findFirst({
    where: {
      room_id: parseInt(roomId),
      user_id: user?.id,
    },
  });

  if (oldReview) {
    // we can make update any thing here if we want
    res
      .status(400)
      .json(responseFailedHandler(400, "You have already reviewed this room"));
    return;
  }

  const newReview = await prisma.review.create({
    data: {
      rate,
      review_text: review,
      room_id: roomId,
      user_id: user?.id,
      createdAt: new Date(),
    },

    select: {
      rate: true,
      review_text: true,
      createdAt: true,
      room: {
        select: { title: true, main_image: true, price_per_day: true },
      },
    },
  });
  res.status(201).json(
    responseSuccessfulHandler("Review created successfully", 201, {
      data: newReview,
    })
  );
  return;
};
const getMyReviews = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const [skip, limit] = returnSkip(req);

  const [reviews, totalReview] = await Promise.all([
    prisma.review.findMany({
      take: limit,
      skip,
      where: {
        user_id: userId,
      },
    }),
    prisma.review.count({
      where: {
        user_id: userId,
      },
    }),
  ]);

  if (!reviews) {
    res
      .status(404)
      .json(responseFailedHandler(404, "You haven't reviewed any room yet"));
    return;
  }

  res.status(200).json(
    responseSuccessfulHandler("Reviews retrieved successfully", 200, {
      data: reviews,
      totalPage: Math.ceil(totalReview / +limit),
    })
  );
};

const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  if (!reviewId) {
    res.status(400).json(responseFailedHandler(400, "review id is required"));
    return;
  }
  const user = req.user;

  const deletedReview = await prisma.review.delete({
    where: {
      id: parseInt(reviewId),
      user_id: user?.id,
    },
  });

  if (!deletedReview) {
    res
      .status(404)
      .json(responseFailedHandler(404, "This review isn't founded"));
    return;
  }

  res
    .status(200)
    .json(responseSuccessfulHandler("Review deleted successfully", 200, null));
};

const updateReview = async (req: Request, res: Response) => {
  const { reviewId, reviewText, rate } = req.body;

  const user = req.user;

  const ifValidRate = rate > 0 || rate < 6;

  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
      user_id: user?.id,
    },
    data: {
      ...(ifValidRate && { rate: parseInt(rate) }),
      ...(reviewText?.trim()?.length > 5 && { review_text: reviewText }),
    },
  });

  if (!updatedReview) {
    res.status(404).json(responseFailedHandler(404, "review not found"));
    return;
  }

  res.status(200).json(
    responseSuccessfulHandler("review updated successfully", 200, {
      data: updatedReview,
    })
  );
  return;
};

const getSomeReviews = async (req: Request, res: Response) => {
  const { limit = 6 } = req.query;
  const reviews = await prisma.review.findMany({
    take: parseInt(limit as string),
    where: {
      rate: {
        gt: 4,
      },
    },
    select: {
      id: true,
      rate: true,
      review_text: true,
      createdAt: true,
      user: {
        select: {
          image: true,
          full_name: true,
        },
      },
    },
  });

  if (!reviews) {
    res.status(404).json(responseFailedHandler(404, "Reviews not found"));
    return;
  }
  res.status(200).json(
    responseSuccessfulHandler("Reviews retrieved successfully", 200, {
      data: reviews,
    })
  );
};

const getReviewsByRoomId = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { sort } = req.query;
  const [skip, limit] = returnSkip(req);

  if (!roomId) {
    res.status(400).json(responseFailedHandler(400, "Room ID is required"));
    return;
  }
  const isValidSort = validSort(sort);
  const [reviews, totalReview] = await Promise.all([
    prisma.review.findMany({
      take: limit,
      skip,
      where: {
        room_id: parseInt(roomId),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      ...(isValidSort && {
        orderBy: {
          createdAt: sort === "desc" ? "desc" : "asc",
        },
      }),
    }),
    prisma.review.count({
      where: {
        room_id: parseInt(roomId),
      },
    }),
  ]);

  res.status(200).json(
    responseSuccessfulHandler("Reviews retrieved successfully", 200, {
      data: reviews,
      totalPage: Math.ceil(totalReview / +limit),
    })
  );
};

const getAllReviews = async (req: Request, res: Response) => {
  const { sort } = req.query;
  const [skip, limit] = returnSkip(req);
  const isValidSort = validSort(sort);
  const [reviews, totalReview] = await Promise.all([
    prisma.review.findMany({
      take: limit,
      skip,
      include: {
        user: {
          select: {
            email: true,
            full_name: true,
            image: true,
          },
        },
      },
      ...(isValidSort && {
        orderBy: {
          createdAt: sort === "desc" ? "desc" : "asc",
        },
      }),
    }),
    prisma.review.count(),
  ]);

  res.status(200).json(
    responseSuccessfulHandler("Reviews retrieved successfully", 200, {
      data: reviews,
      totalPage: Math.ceil(totalReview / +limit),
    })
  );
};

const deleteReviewByEmployees = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  if (!reviewId) {
    res.status(400).json(responseFailedHandler(400, "review id is required"));
    return;
  }

  const review = await prisma.review.findUnique({
    where: {
      id: parseInt(reviewId),
    },
  });

  if (!review) {
    res.status(404).json(responseFailedHandler(404, "Review not found"));
    return;
  }

  const deletedReview = await prisma.review.delete({
    where: {
      id: parseInt(reviewId),
    },
  });

  if (!deletedReview) {
    res
      .status(404)
      .json(responseFailedHandler(404, "This review isn't founded"));
    return;
  }

  res
    .status(200)
    .json(responseSuccessfulHandler("Review deleted successfully", 200, null));
};

export {
  addReview,
  deleteReview,
  updateReview,
  getReviewsByRoomId,
  getAllReviews,
  deleteReviewByEmployees,
  getMyReviews,
  getSomeReviews,
};
