import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import returnSkip from "../utils/func/ReturnSkip.js";
import { deleteExistImage } from "../lib/config/Cloudinary.js";

const prisma = new PrismaClient();

// Creates a new room with provided details
const createRoom = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(responseFailedHandler(400, errors.array()[0].msg));
  }
  const { price, title, familyCount, description, roomsCount } = req.body;

  const image = req.file ? req.file.path : null;

  if (!image) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "Image is required"));
  }

  const newRoom = await prisma.room
    .create({
      data: {
        title,
        description,
        price_per_day: +price,
        family_count: parseInt(familyCount, 10),
        room_count: parseInt(roomsCount, 10),
        main_image: image,
      },
    })
    .catch((e) => {
      return res.status(500).json(responseFailedHandler(500, e.message));
    });

  if (!newRoom) {
    return res
      .status(500)
      .json(responseFailedHandler(500, "Internal Server Error"));
  }

  const images = req.files;

  if (images && Array.isArray(images) && images.length > 0) {
    const createImages = prisma.roomImage.createMany({
      data: images?.map((image: any) => ({
        room_id: (newRoom as any).id,
        image: image.path,
      })),
    });
    await prisma.$transaction([createImages]); // Wrap in transaction to ensure both operations are executed or rolled back
  }
  res
    .status(201)
    .json(responseSuccessfulHandler("New room Created", 201, newRoom));
};

// Retrieves room information by ID
const getRoomById = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId || isNaN(+roomId)) {
    return res.status(400).json(responseFailedHandler(400, "Invalid room id"));
  }
  const room = await prisma.room.findUnique({
    where: {
      id: Number(roomId),
    },
    include: {
      room_images: true,
      reviews: true,
    },
  });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }
  res.status(200).json(responseSuccessfulHandler("Room found", 200, room));
};

// Gets list of all rooms by search filter and pagination
const getAllRooms = async (req: Request, res: Response) => {
  const { page = 1, limit = 30, familyCount, price, title } = req.query;
  const filter: {
    family_count?: number;
    price_per_day?: number;
    title?: RegExp;
  } = {};
  if (familyCount && +familyCount > 0) {
    filter.family_count = +Number(familyCount);
  }
  if (price && +price > 0) {
    filter.price_per_day = +price;
  }
  if (title && title.toString().trim().length > 0) {
    filter.title = new RegExp(title.toString().trim(), "i");
  }
  const skip = returnSkip(+page, +limit);

  const [rooms, totalRooms] = await Promise.all([
    prisma.room.findMany({
      where: {
        family_count: filter.family_count,
        price_per_day: {
          lte: filter.price_per_day,
        },
        title: filter.title ? { contains: filter.title.source } : undefined,
      },
      skip,
      take: +limit,
      include: {
        room_images: true,
      },
    }),
    await prisma.room.count(),
  ]);
  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: rooms,
      totalPages: Math.ceil(totalRooms / Number(limit)),
      page: Number(page),
      limit: Number(limit),
    })
  );
};

// Gets featured rooms by search
const getFeaturedRooms = async (req: Request, res: Response) => {
  const { limit = 8 } = req.query;
  const skip = returnSkip(+1, +limit);

  const rooms = await prisma.room
    .findMany({
      skip,
      take: +limit,
      include: {
        room_images: true,
        _count: {
          select: {
            reservations: true,
          },
        },
      },
    })
    .catch((e) => {
      res.status(500).json(responseFailedHandler(500, e.message));
      return;
    });

  const featuredRooms =
    rooms &&
    rooms
      .filter((room) => room._count.reservations > 10)
      .map(({ _count, ...rest }) => rest);

  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: featuredRooms,
    })
  );
};

// Gets suggestion rooms by search
const getSuggestionsRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room
    .findMany({
      take: 5,
      include: {
        room_images: true,
      },
    })
    .catch((error) => {
      console.error("Error fetching suggestion rooms:", error);
      return null;
    });

  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: rooms,
    })
  );
};

// Updates room details
const updateRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  if (!roomId) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "roomId is required"));
  }
  const { price, title, familyCount, description, roomsCount } = req.body;
  const image = req.file ? req.file.path : null;

  const data: {
    price_per_day?: number;
    title?: string;
    family_count?: number;
    description?: string;
    room_count?: number;
    main_image?: string;
  } = {};

  if (price) data.price_per_day = +price;
  if (image) data.main_image = image;
  if (title) data.title = title;
  if (familyCount) data.family_count = +familyCount;
  if (description) data.description = description;
  if (roomsCount) data.room_count = +roomsCount;

  const room = await prisma.room.update({
    where: { id: parseInt(roomId) },
    data,
  });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }

  res.status(200).json(
    responseSuccessfulHandler("Room updated", 200, {
      data: room,
    })
  );
};

// Removes room from database
const deleteRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  if (!roomId.trim()) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "roomId is required"));
  }

  const room = await prisma.room
    .delete({
      where: { id: parseInt(roomId) },
    })
    .catch((e) => {
      res.status(500).json(responseFailedHandler(500, e.message));
      return;
    });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }

  res.status(200).json(
    responseSuccessfulHandler("Room deleted", 200, {
      data: room,
    })
  );
};

// Lists rooms that are currently available
const getAvailableRooms = async (req: Request, res: Response) => {
  const { page = 1, limit = 30 } = req.query;
  const skip = returnSkip(+page, +limit);

  const allRooms = await prisma.room.findMany({
    include: {
      room_images: true,
      reservations: {
        where: {
          is_active: true,
          end_date: {
            gte: new Date(),
          },
          start_date: {
            lte: new Date(),
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  const availableRooms = allRooms.filter(
    (room) => room.room_count > room.reservations.length
  );

  const paginatedRooms = availableRooms.slice(skip, skip + +limit);

  const finalRooms = paginatedRooms.map(({ reservations, ...rest }) => rest);

  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: finalRooms,
      totalPages: Math.ceil(availableRooms.length / Number(limit)),
      page: Number(page),
      limit: Number(limit),
    })
  );
};

// Updates room image collection
const updateRoomImages = async (req: Request, res: Response) => {
  const { roomId, imageId } = req.body;
  const image = req.file ? req.file.path : null;

  if (!roomId || !imageId) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "roomId and imageId are required"));
  }

  if (!image) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "image is required"));
  }

  const oldImage = await prisma.roomImage.findUnique({
    where: {
      id: parseInt(imageId),
      room_id: parseInt(roomId),
    },
  });

  if (!oldImage) {
    return res.status(404).json(responseFailedHandler(404, "image not found"));
  }

  if (oldImage.room_id !== parseInt(roomId)) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "Image does not belong to this room"));
  }

  await deleteExistImage(oldImage.image);

  const updateImage = await prisma.roomImage.update({
    where: {
      id: parseInt(imageId),
      room_id: parseInt(roomId),
    },
    data: {
      image,
    },
  });

  res.status(200).json(
    responseSuccessfulHandler("Image updated", 200, {
      data: updateImage,
    })
  );
};

export {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  getSuggestionsRooms,
  getFeaturedRooms,
  deleteRoom,
  getAvailableRooms,
  updateRoomImages,
};
