import "../../loadEnvironment";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/userModel";
import registerUser from "./userControllers";
import CustomError from "../../utils/error";

describe("Given a function registerUser.", () => {
  const mockUser = {
    userName: "mockUser",
    email: "mockuser@mock.net",
    password: "1234",
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const status = 201;
  const next = jest.fn();

  bcryptjs.hash = jest.fn().mockResolvedValue("Passwordwithash");
  User.create = jest.fn().mockResolvedValue(mockUser);

  describe("When is called.", () => {
    test("It should send a response with the code 200.", async () => {
      const req = {
        body: {
          user: mockUser,
        },
      } as Partial<Request>;

      await registerUser(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When is called with a not good request.", () => {
    test("Then it should trhow an 400 error.", async () => {
      const badUser = {
        userName: "mockUser",
        email: "mockuser@mock.net",
        password: "1234",
      };
      const req = {
        body: {
          user: badUser,
        },
      } as Partial<Request>;

      User.create = jest
        .fn()
        .mockRejectedValue(new CustomError(400, "Error", ""));

      await registerUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
