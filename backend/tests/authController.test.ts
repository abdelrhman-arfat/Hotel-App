import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { ROLES } from "../constants/Roles";
import { app } from "../index";

const prisma = new PrismaClient();

describe("User Controller", () => {
  const backendToken = "";
  const backendRefreshToken = "";
  const testUserData = {
    fullname: "test_user",
    email: "test@example.com",
    password: "123456",
    role: ROLES.CUSTOMER,
    image: "https://example.com/image.jpg",
  };

  beforeEach(async () => {
    await prisma.user.deleteMany({
      where: {
        OR: [{ email: testUserData.email }],
      },
    });
  });

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        OR: [{ email: testUserData.email }],
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe.skip("POST /api/auth/login-signup", () => {
    it("should create a new user when user doesn't exist and login if user is exist", async () => {
      const res = await request(app)
        .post("/api/auth/login-signup")
        .send(testUserData);

      expect([200]).toContain(res.statusCode);
      expect(res.body).toHaveProperty("message");
      expect(res.body.success).toBe(true);

      const cookies = res.headers["set-cookie"];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/token=/);
      expect(cookies[1]).toMatch(/refreshToken=/);
    });
  });
  describe.skip("Post /api/auth/logout", () => {
    it("should logout user", async () => {
      // first check the token is valid first if not valid this will return an unauthorized code 401;

      const res = await request(app)
        .post("/api/auth/logout")
        .set("Cookie", [
          `backendToken=${backendToken}`,
          `backendRefreshToken=${backendRefreshToken}`,
        ]);

      console.log(res.body);

      expect([200, 401]).toContain(res.statusCode); // 200 for success, 401 for unauthorized
      expect(res.body).toHaveProperty("message");
    });
  });

  describe.skip("Refresh token router", () => {
    it("should return a new token", async () => {
      const res = await request(app)
        .post("/api/auth/refresh-token")
        .set("Cookie", [
          `backendToken=${backendToken}`,
          `backendRefreshToken=${backendRefreshToken}`,
        ]);

      expect([200, 401]).toContain(res.statusCode);
      expect(res.body).toHaveProperty("message");
    });
  });
  describe.skip("Delete account", () => {
    it("should delete account if is login successfully", async () => {
      const res = await request(app)
        .delete("/api/auth/delete-account")
        .send({
          id: 119,
        })
        .set("Cookie", [`backendToken=${backendToken}`]);

      expect([200, 401]).toContain(res.statusCode);
      expect(res.body).toHaveProperty("message");
    });
  });
});
