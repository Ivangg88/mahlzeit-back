import { Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { RecipteFromDB } from "../../types/interfaces";
import { createReciptes, getReciptes } from "./reciptesController";

describe("Given a function reciptesController", () => {
  const recipte: RecipteFromDB = {
    id: "",
    name: "Test recipte",
    persons: 0,
    dificulty: "Difícil",
    autor: "",
    image: "",
    ingredients: "",
    process: "",
    backupImage: "",
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const req = { body: recipte } as Partial<Request>;

  const next = jest.fn();

  describe("When the function getReciptes is called with a request", () => {
    test("Then it should call the method status of response with 200 and the method json of response with an array of items", async () => {
      const items = [recipte];

      const status = 201;

      Recipte.find = jest.fn().mockResolvedValue(items);

      await getReciptes(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ reciptes: items });
    });
  });

  describe("When the function createRecipte is called", () => {
    test("Then it should call the method status of res with 201 and the method json with a recipte", async () => {
      const status = 201;
      Recipte.create = jest.fn().mockResolvedValue(recipte);

      await createReciptes(req as Request, res as Response, next);

      expect(res.status).toBeCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(recipte);
    });
  });
});
