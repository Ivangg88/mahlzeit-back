import { Request, Response } from "express";
import Item from "../../database/models/itemModel";
import { IItem } from "../../types/interfaces";
import getItems from "./itemController";

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
      const items: IItem[] = [{ ingredients: [], process: { steps: [] } }];
      const status = 201;

      Item.find = jest.fn().mockResolvedValue(items);

      await getItems(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(items);
    });
  });

  describe("When is called with a bad request", () => {
    test("Then it should call the function next with an error", async () => {
      await getItems(req as Request, res as Response, next);

      Item.find = jest.fn().mockResolvedValue(new Error());

      expect(next).toHaveBeenCalled();
    });
  });
});
