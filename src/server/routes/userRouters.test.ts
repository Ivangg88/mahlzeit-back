import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "..";
import connectDB from "../../database";
import User from "../../database/models/userModel";
import { UserResgiter } from "../../types/interfaces";
import hashCreator from "../../utils/authentication";

let mongoServer: MongoMemoryServer;
let user: UserResgiter;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await connectDB(url);

  const password = "12345";
  const hasedPassword = await hashCreator(password);
  user = {
    userName: "Pau",
    email: "pau@isdi.com",
    password: hasedPassword,
  };

  await User.create(user);
});

afterAll(async () => {
  User.deleteMany({});
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given an userRouters on the endpooint /register", () => {
  describe("When receives a request with an object user", () => {
    test("Then it should call the controller registerUser", async () => {
      await request(app).post("/register").send(user);
    });
  });
});
