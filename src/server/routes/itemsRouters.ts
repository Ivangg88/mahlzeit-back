import express from "express";
import getItems from "../controllers/itemController";

const itemsRouters = express.Router();

itemsRouters.get("/getAll", getItems);

export default itemsRouters;
