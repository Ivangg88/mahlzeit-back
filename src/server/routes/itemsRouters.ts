import express from "express";
import { validate } from "express-validation";
import getItems from "../controllers/itemController";
import itemSchema from "../schema/itemSchema";

const itemsRouters = express.Router();

itemsRouters.get(
  "/getAll",
  validate(itemSchema, {}, { abortEarly: false }),
  getItems
);
