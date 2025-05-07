import request from "supertest";
import { app } from "../index";
import { PrismaClient } from "@prisma/client";
import { ROLES } from "../constants/Roles";
import { exec } from "child_process";

const prisma = new PrismaClient();

describe("Room Controller", () => {
  const fakeToken = `
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2NTM3NDQxLCJleHAiOjE3NDY1MzgzNDF9.A-zk2OC2wHfBuYnb8dv5XBa4v-O0M-N6e3SGKW5mX9s`;
  const fakeRefreshToken = "";

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
      .set("Cookie", [`token=${fakeToken}`]);
    expect(res.statusCode).toEqual(201);
  });

  it.skip("should update a room", async () => {
    const roomId = 1; // this will be from the database when you create a room first time from the createRoom test ski
    const room = {
      title: "test room",
    };

    it.skip(" Get all rooms with filtering with price , familyCount ,title and pagination as query params ", async () => {
      const res = await request(app).get("/room"); // ? page=1 & limit=10 & Price<=200& familyCount=2 & title=test room
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.data).toBeInstanceOf(Array);
      expect(res.body.success).toBe(true);
    });

    const res = await request(app)
      .put(`/api/room/${roomId}`)
      .send(room)
      .set("Cookie", [`token=${fakeToken}`]);
    expect(res.statusCode).toEqual(200);
  });

  it.skip("should delete a room", async () => {
    const roomId = 2;

    const res = await request(app)
      .delete(`/api/room/get-room/${roomId}`)
      .set("Cookie", [`token=${fakeToken}`]);
    expect(res.statusCode).toEqual(200);
  });

  it("should get a room", async () => {
    const roomId = 1;
    const res = await request(app).get(`/api/room/${roomId}`);
    expect(res.statusCode).toEqual(200);
  });
});
