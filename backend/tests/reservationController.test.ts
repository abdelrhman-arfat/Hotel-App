import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../index";

const prisma = new PrismaClient();

describe.skip("Reservation Controller", () => {
  const backendToken = ``;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it.skip("get all reservations", async () => {
    const response = await request(app)
      .get("/api/reservation")
      .set("Cookie", [`backendToken=${backendToken}`]);

    expect([200]).toContain(response.statusCode);
  });
  it.skip("get all reservations", async () => {
    const response = await request(app)
      .get("/api/reservation/get-by-user/test@gmail.com")
      .set("Cookie", [`backendToken=${backendToken}`]);

    expect([200]).toContain(response.statusCode);
  });

  it.skip("create reservation", async () => {
    const reservation = {
      roomId: 1,
      startDay: "2025-09-10",
      totalDays: 4,
    };
    const response = await request(app)
      .post("/api/reservation")
      .set("Cookie", [`backendToken=${backendToken}`])
      .send(reservation);

    expect([201]).toContain(response.statusCode);
  });
});
