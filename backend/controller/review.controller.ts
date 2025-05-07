import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import returnSkip from "../utils/func/ReturnSkip.js";

const prisma = new PrismaClient();

const addReview = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(responseFailedHandler(400, errors.array()[0].msg));
    return;
  }

  const user = req.user;
  if (!user || !user.id) {
    res.status(401).json(responseFailedHandler(401, "login first"));
    return;
  }

  const { rate, review, roomId } = req.body;
  const newReview = await prisma.review.create({
    data: {
      createdAt: new Date(),
      user_id: user?.id,
      rate,
      review_text: review,
      room_id: roomId,
    },
  });
  res.status(201).json(
    responseSuccessfulHandler("Review created successfully", 201, {
      data: newReview,
    })
  );
  return;
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(responseFailedHandler(400, errors.array()[0].msg));
    return;
  }

  const { reviewId, reviewTest } = req.body;

  const user = req.user;
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
      user_id: user?.id,
    },
    data: {
      review_text: reviewTest,
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

const getReviewsByRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { sort, page = 1, limit = 50 } = req.query;
  const skip = returnSkip(+page, +limit);
  if (!roomId) {
    res.status(400).json(responseFailedHandler(400, "Room ID is required"));
    return;
  }

  const [reviews, totalReview] = await Promise.all([
    prisma.review.findMany({
      take: Number(limit),
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
      ...(sort &&
        ["desc", "asc"].includes(sort.toString().trim()) && {
          orderBy: {
            createdAt: sort.toLocaleString() === "desc" ? "desc" : "asc",
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
  const { sort, page = 1, limit = 50 } = req.query;
  const skip = returnSkip(+page, +limit);

  const [reviews, totalReview] = await Promise.all([
    prisma.review.findMany({
      take: Number(limit),
      skip,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      ...(sort &&
        ["desc", "asc"].includes(sort.toString().trim()) && {
          orderBy: {
            createdAt: sort.toLocaleString() === "desc" ? "desc" : "asc",
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

export {
  addReview,
  deleteReview,
  updateReview,
  getReviewsByRoom,
  getAllReviews,
};
