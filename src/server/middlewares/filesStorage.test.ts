import { Request, Response } from "express";
import fileStorage from "./filesStorage";

describe("Given a fileStorage function", () => {
  describe("When is called with a request", () => {
    test("Then it should call the function next", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      const req = {} as Partial<Request>;

      const next = jest.fn();
      fileStorage(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
