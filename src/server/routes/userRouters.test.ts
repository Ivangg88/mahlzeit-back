import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "..";
import connectDB from "../../database";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await connectDB(url);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given an userRouters on the endpooint /users/register", () => {
  describe("When receives a request with an object user", () => {
    test("Then it should call the controller registerUser", async () => {
      const user = {
        userName: "Pau",
        email: "pau@isdi.com",
        password: "hasedPassword",
      };

      const responseBody = {
        message: `User ${user.userName} was registered sucessfully.`,
      };

      const { body } = await request(app)
        .post("/users/register")
        .send(user)
        .expect(201);

      expect(body).toEqual(responseBody);
    });
  });
});

describe("Given an userRouters on the endpooint /users/login", () => {
  describe("When receives a request with an object user", () => {
    test("Then it should call the controller registerUser", async () => {
      const user = {
        userName: "Pau",
        password: "hasedPassword",
      };
      const token = "tokencreated";

      jwt.sign = jest.fn().mockReturnValue(token);

      const responseBody = {
        token: "tokencreated",
      };

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(200);

      expect(body).toEqual(responseBody);
    });
  });
});
