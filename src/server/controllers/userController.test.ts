import "../../loadEnvironment";
import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/userModel";
import { loginUser, registerUser } from "./userControllers";
import CustomError from "../../utils/error";
import { UserFromDB } from "../../types/interfaces";

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

describe("Given a function loginUser", () => {
  const userMock: UserFromDB = {
    userName: "Mock logged user",
    email: "Mock email",
    password: "Mock password",
    id: "Mock id",
  };
  const token = "a4a5d5";
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const req = {
    body: {
      userMock,
    },
  } as Partial<Request>;

  const next: Partial<NextFunction> = jest.fn();
  const statusCode = 200;

  describe("When is called with a request with a correct userName and password", () => {
    test("Then it should call the method status from response with a 200 and a body with a token", async () => {
      User.findOne = jest.fn().mockResolvedValue(userMock);
      bcryptjs.compare = jest.fn().mockReturnValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ user: { token } });
    });
  });

  describe("When is called with an incorrect username", () => {
    test("Then it should call the next function with an error", async () => {
      const userNotFound: null = null;
      const userError = new CustomError(
        403,
        "Error with the authentication",
        "User not found"
      );

      User.findOne = jest.fn().mockResolvedValue(userNotFound);
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });

  describe("When is called and the database response with an empty array", () => {
    test("Then call the response method next with an error", async () => {
      const usersFound = new Error();
      const userError = new CustomError(
        403,
        "User or password not found.",
        usersFound.message
      );

      User.findOne = jest.fn().mockRejectedValue(usersFound);
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });

  describe("When is called with an incorrect password", () => {
    test("Then it should calle the function next with an error", async () => {
      const userError = new CustomError(403, "Password invalid", "");

      User.findOne = jest.fn().mockResolvedValue(userMock);
      bcryptjs.compare = jest.fn().mockResolvedValue(false);
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });

  describe("When is called and the compare function trhows an error", () => {
    test("then it should call the function next with an error", async () => {
      const userError = new CustomError(403, "", "");
      const bcryptError = new Error();

      User.findOne = jest.fn().mockResolvedValue(userMock);
      bcryptjs.compare = jest.fn().mockRejectedValue(bcryptError);
      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(userError);
    });
  });
});
