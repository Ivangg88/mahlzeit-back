import { NextFunction, Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { CustomRequest, RecipteFromDB } from "../../types/interfaces";
import CustomError from "../../utils/error";
import preloadStore from "../../utils/storePreloadTest";
import {
  createReciptes,
  deleteRecipte,
  getRecipteById,
  getReciptes,
} from "./reciptesController";

describe("Given a function reciptesController", () => {
  const recipte: RecipteFromDB = preloadStore.mockRecipte;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  let req = { body: recipte } as Partial<Request>;

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

  describe("When the function getReciptes is called with a bad request", () => {
    test("Then it should call the function next with an error", async () => {
      const error = new CustomError(404, "error", "Unable to get the items.");

      Recipte.find = jest.fn().mockRejectedValue(error);

      await getReciptes(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When the function createRecipte is called", () => {
    test("Then it should call the method status of res with 201 and the method json with a recipte", async () => {
      const status = 201;
      Recipte.create = jest.fn().mockResolvedValue(recipte);

      await createReciptes(req as CustomRequest, res as Response, next);

      expect(res.status).toBeCalledWith(status);
    });
  });

  describe("When the function createRecipte is called with a bad request", () => {
    test("Then it should call the function next with an error", async () => {
      const error = new Error();
      Recipte.create = jest.fn().mockRejectedValue(error);

      await createReciptes(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the function deleteRecipte is called with a request", () => {
    req = {
      ...req,
      query: { id: "test-id" },
      body: {},
    } as Partial<Request>;

    test("Then it should call the status method with a 201 and json with a message", async () => {
      Recipte.findByIdAndDelete = jest.fn().mockResolvedValue("");

      await deleteRecipte(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("When it receives an error", () => {
    test("Then it should call the next method", async () => {
      Recipte.findByIdAndDelete = jest.fn().mockRejectedValue("");

      await deleteRecipte(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When the function getRecipteById is called", () => {
    req = {
      ...req,
      params: { id: "test-id" },
    } as Partial<Request>;

    describe("And receives a request with an id", () => {
      test("Then it should return a recipte", async () => {
        Recipte.findById = jest.fn().mockResolvedValueOnce(recipte);

        await getRecipteById(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ recipte });
      });
    });

    describe("And receives an error", () => {
      test("Then it should call the enxt method", async () => {
        Recipte.findById = jest.fn().mockRejectedValueOnce(recipte);

        await getRecipteById(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});
