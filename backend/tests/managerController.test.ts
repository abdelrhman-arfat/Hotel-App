import request from "supertest";
import { app } from "../index";
import { PrismaClient } from "@prisma/client";
import { ROLES } from "../constants/Roles";

const prisma = new PrismaClient();

describe.skip("Manager Controller", () => {
  const backendToken = "";
  const backendRefreshToken = "";

  it.skip("should update user role", async () => {
    const res = await request(app)
      .post("/api/manager/update-user-role")
      .send({
        role: ROLES.EMPLOYEE, // or customer or manager as you if you want if you want to change the role
      })
      .set("Cookie", [`backendToken=${backendToken}`]);
    expect([200, 401, 403]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  it.skip("should get all users", async () => {
    const res = await request(app)
      .get(
        "/api/manager/get-all-users" // ? role=user role & email= user email
      )
      .set("Cookie", [`backendToken=${backendToken}`]);
    expect([200, 401, 403]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  it.skip("should return the system analytics", async () => {
    const res = await request(app).get("/api/manager/analytics");
    expect([200, 401, 403]).toContain(res.statusCode); // to check if not found .
  });
});
