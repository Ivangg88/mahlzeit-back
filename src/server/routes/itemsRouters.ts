import express from "express";
import { createReciptes, getReciptes } from "../controllers/reciptesController";

const reciptesRouters = express.Router();

reciptesRouters.get("/getAll", getReciptes);
reciptesRouters.post("/create", createReciptes);

export default reciptesRouters;
