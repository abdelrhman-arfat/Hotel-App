import request from "supertest";
import { app } from "../index";
import { PrismaClient } from "@prisma/client";
import { ROLES } from "../constants/Roles";

const prisma = new PrismaClient();

describe.skip("Room Controller", () => {
  const backendToken = ``;
  const backendRefreshToken = "";

  //if found if not will return 404 with message that room not found or auth codes 401 403 if not from the employee or the admins :

  it.skip("should create a room", async () => {
    const room = {
      price: 100,
      title: "test room",
      familyCount: 2,
      description: "test description",
      roomsCount: 2,
      image: "test image", // this will be from the files uploads
    }; // when you use this test this will return 400 because you need to upload the image first from client
    const res = await request(app)
      .post("/api/room")
      .send(room)
      .set("Cookie", [`backendToken=${backendToken}`]);
    expect(res.statusCode).toEqual(201);
  });

  it.skip("should update a room ", async () => {
    const roomId = 1; // this will be from the database when you create a room first time from the createRoom test ski
    const room = {
      title: "test room",
    };

    const res = await request(app)
      .put(`/api/room/${roomId}`)
      .send(room)
      .set("Cookie", [`backendToken=${backendToken}`]);
    expect(res.statusCode).toEqual(200);
  });

  it.skip(" Get all rooms with filtering with price , familyCount ,title and pagination as query params ", async () => {
    const res = await request(app).get("/room"); // ? page=1 & limit=10 & Price<=200& familyCount=2 & title=test room
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.data).toBeInstanceOf(Array);
    expect(res.body.success).toBe(true);
  });

  it.skip("should delete a room ", async () => {
    const roomId = 2;

    const res = await request(app)
      .delete(`/api/room/${roomId}`)
      .set("Cookie", [`backendToken=${backendToken}`]);
    expect(res.statusCode).toEqual(200);
  });

  it.skip("should get a room ", async () => {
    const roomId = 1;
    const res = await request(app).get(`/api/room/get-room/${roomId}`);
    expect([404, 200, 401, 403]).toEqual(200);
  });

  it.skip("it should return the featured rooms with the reservation is bigger thant 10 reservation", async () => {
    const res = await request(app).get("/api/room/featured?page=1&limit=5");
    expect([200]).toContain(res.statusCode);
  });
});
