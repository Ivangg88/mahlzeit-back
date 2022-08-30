import { Request, Response } from "express";
import errorNotFound from "./errors";

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
