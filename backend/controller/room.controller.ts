import { Request, Response } from "express";
import responseFailedHandler from "../utils/types/response/responseFailedHandler.js";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";
import returnSkip from "../utils/func/ReturnSkip.js";
import { deleteExistImage } from "../lib/config/Cloudinary.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Creates a new room with provided details
const createRoom = async (req: Request, res: Response) => {
  const { price, title, familyCount, description, roomsCount } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const mainImage = files?.main_image?.[0];

  if (!mainImage) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "Main image is required"));
  }

  const newRoom = await prisma.room
    .create({
      data: {
        title,
        description,
        price_per_day: +price,
        family_count: parseInt(familyCount, 10),
        room_count: parseInt(roomsCount, 10),
        main_image: mainImage.path,
        is_deleted: false,
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
  const additionalImages = files?.images || [];

  if (
    additionalImages &&
    Array.isArray(additionalImages) &&
    additionalImages.length > 0
  ) {
    const createImages = prisma.roomImage.createMany({
      data: additionalImages?.map((image: any) => ({
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
      is_deleted: false,
    },
    include: {
      room_images: true,
      reviews: {
        select: {
          review_text: true,
          rate: true,
          user: {
            select: {
              full_name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }
  res.status(200).json(responseSuccessfulHandler("Room found", 200, room));
};

// Gets list of all rooms by search filter and pagination
const getAllRooms = async (req: Request, res: Response) => {
  const {
    familyCount,
    minPrice,
    maxPrice,
    title,
  }: {
    familyCount?: number;
    minPrice?: number;
    maxPrice?: number;
    title?: string;
  } = req.query;

  const [skip, limit] = returnSkip(req);

  const [rooms, totalRooms] = await Promise.all([
    prisma.room.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price_per_day: true,
        family_count: true,
        room_count: true,
        main_image: true,
        room_images: {
          select: {
            image: true,
            id: true,
          },
        },
      },

      where: {
        is_deleted: false,
        ...(familyCount &&
          !isNaN(+familyCount) && { family_count: +familyCount }),
        ...((minPrice || maxPrice) && {
          price_per_day: {
            ...(minPrice && !isNaN(+minPrice) && { gte: +minPrice }),
            ...(maxPrice && !isNaN(+maxPrice) && { lte: +maxPrice }),
          },
        }),
        ...(title &&
          title.trim() !== "" && { title: { contains: title.trim() } }),
      },
      skip,
      take: limit,
    }),
    await prisma.room.count(),
  ]);
  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: rooms,
      totalPages: Math.ceil(totalRooms / Number(limit)),
    })
  );
};

// Gets featured rooms by search
const getFeaturedRooms = async (req: Request, res: Response) => {
  const [skip, limit] = returnSkip({
    query: { page: 1, limit: req.query.limit || 8 },
  });

  const rooms = await prisma.room.findMany({
    skip,
    take: +limit,
    where: {
      is_deleted: false,
    },
    include: {
      _count: {
        select: {
          reservations: true,
        },
      },
    },
  });

  let featuredRooms = rooms
    .filter((room) => room._count.reservations > 10)
    .map(({ _count, ...rest }) => rest);

  if (featuredRooms.length === 0) {
    featuredRooms = rooms.map(({ _count, ...rest }) => rest);
  }

  res.status(200).json(
    responseSuccessfulHandler("Rooms found", 200, {
      data: featuredRooms,
    })
  );
};

// Gets suggestion rooms by search
/*
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
*/

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
  // Soft delete: set is_deleted to true
  const room = await prisma.room.update({
    where: { id: parseInt(roomId) },
    data: { is_deleted: true },
  });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }

  res.status(200).json(
    responseSuccessfulHandler("Room deleted (soft)", 200, {
      data: room,
    })
  );
};

// Lists rooms that are currently available

// Updates room image collection
const updateRoomImage = async (req: Request, res: Response) => {
  const { imageId } = req.params;
  const image = req.file ? req.file.path : null;

  if (!imageId) {
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
    },
  });

  if (!oldImage) {
    return res.status(404).json(responseFailedHandler(404, "image not found"));
  }

  await deleteExistImage(oldImage.image);

  const updateImage = await prisma.roomImage.update({
    where: {
      id: parseInt(imageId),
    },
    data: {
      image,
    },
  });

  if (!updateImage) {
    return res
      .status(404)
      .json(responseFailedHandler(404, "Can't update the image"));
  }

  res.status(200).json(
    responseSuccessfulHandler("Image updated", 200, {
      data: updateImage,
    })
  );
};

const availableReservations = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res
      .status(400)
      .json(responseFailedHandler(400, "roomId is required"));
  }

  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(roomId),
    },
  });

  if (!room) {
    return res.status(404).json(responseFailedHandler(404, "Room not found"));
  }

  const roomCount = room.room_count;
  const today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(0, 0, 0, 0); // Normalize to start of tomorrow

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const formatMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const result: { month: string; ranges: { start: string; end: string }[] }[] =
    [];
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 6);
  endDate.setDate(0); // Set to the last day of the 6th month from now

  let currentDate = new Date(today);
  let currentMonthRanges: { start: string; end: string }[] = [];
  let rangeStart: Date | null = null;

  while (currentDate <= endDate) {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    const overlappingReservationsCount = await prisma.reservation.count({
      where: {
        room_id: parseInt(roomId),
        OR: [
          { start_date: { lte: currentDate }, end_date: { gte: currentDate } },
        ],
      },
    });

    if (overlappingReservationsCount < roomCount) {
      if (!rangeStart) {
        rangeStart = new Date(currentDate);
      }
    } else {
      if (rangeStart) {
        currentMonthRanges.push({
          start: formatDate(rangeStart),
          end: formatDate(
            new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
          ), // End date is the day before the current date
        });
        rangeStart = null;
      }
    }

    // Check if we moved to a new month or reached the end date
    if (
      currentDate.getMonth() !== nextDay.getMonth() ||
      currentDate.getTime() === endDate.getTime()
    ) {
      if (rangeStart) {
        currentMonthRanges.push({
          start: formatDate(rangeStart),
          end: formatDate(currentDate),
        });
        rangeStart = null;
      }
      if (currentMonthRanges.length > 0) {
        result.push({
          month: formatMonthName(currentDate),
          ranges: currentMonthRanges,
        });
      }
      currentMonthRanges = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return res.status(200).json(
    responseSuccessfulHandler("Available reservation dates", 200, {
      data: result,
    })
  );
};

export {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  getFeaturedRooms,
  deleteRoom,
  updateRoomImage,
  availableReservations,
};
