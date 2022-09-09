import { Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { getReciptes } from "./reciptesController";

afterEach(() => {
  jest.resetAllMocks();
});

describe("Given a function itemController", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const req = {} as Partial<Request>;

  const next = jest.fn();
  describe("When is called with a request", () => {
    test("Then it should call the method status of response with 200 and the method json of response with an array of items", async () => {
      const items = [
        {
          id: "",
          name: "",
          persons: 0,
          dificulty: "Difícil",
          autor: "",
          image: "",
          ingredients: "",
          process: "",
        },
      ];

      const status = 201;

      Recipte.find = jest.fn().mockResolvedValue(items);

      await getReciptes(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ reciptes: items });
    });
  });

  describe("When is called with a bad request", () => {
    test("Then it should call the function next with an error", async () => {
      await getReciptes(req as Request, res as Response, next);

      Recipte.find = jest.fn().mockResolvedValue(new Error());

      expect(next).toHaveBeenCalled();
    });
  });
});
