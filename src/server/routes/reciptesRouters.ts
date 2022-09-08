import express from "express";
import multer from "multer";

import { createReciptes, getReciptes } from "../controllers/reciptesController";

const reciptesRouters = express.Router();

const upload = multer({ dest: "uploads", limits: { fileSize: 3000000 } });

reciptesRouters.get("/getAll", getReciptes);
reciptesRouters.post("/create", upload.single("image"), createReciptes);

export default reciptesRouters;
