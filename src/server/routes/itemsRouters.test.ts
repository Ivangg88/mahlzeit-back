import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
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

describe("Given an itemRouter on the endpoint /items/getAll", () => {
  describe("When receives a GET request", () => {
    test("Then it should get a 201", async () => {
      await request(app).get("/items/getAll").expect(201);
    });
  });
});
