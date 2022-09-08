import express from "express";
import { createItem, getItems } from "../controllers/itemController";

const itemsRouters = express.Router();

itemsRouters.get("/getAll", getItems);
itemsRouters.post("/create", createItem);

export default itemsRouters;
