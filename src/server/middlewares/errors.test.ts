import { Request, Response } from "express";
import CustomError from "../../utils/error";
import errorNotFound, { generalError } from "./errors";

describe("Given a function errorNotFound", () => {
  describe("When is called", () => {
    test("Then it should call the response method status with the code 404", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const req = {} as Partial<Request>;
      const status = 404;

      errorNotFound(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});

describe("Given a function generalError.", () => {
  describe("When is called with an error.", () => {
    test("Then it should call the response method status with the error code and the error message.", () => {
      const status = 500;
      const errorText = "general error";
      const error = new CustomError(status, errorText, "");
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const req = {} as Partial<Request>;
      const next = () => {};
      const errorMessage = error.publicMessage;

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
