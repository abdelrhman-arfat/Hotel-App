import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAndUpdateReservations() {
  try {
    const now = new Date();

    // 1. Activate only currently ongoing reservations
    await prisma.reservation.updateMany({
      where: {
        start_date: { lte: now },
        end_date: { gte: now },
      },
      data: { is_active: true },
    });

    // 2. Deactivate all others (either ended or not started yet)
    await prisma.reservation.updateMany({
      where: {
        OR: [
          { start_date: { gt: now } }, // Not started yet
          { end_date: { lt: now } }, // Already ended
        ],
      },
      data: { is_active: false },
    });

    console.log("Reservation statuses updated correctly.");
  } catch (error) {
    console.error("Error updating reservations:", error);
  }
}

export default checkAndUpdateReservations;
