import express from "express";
import multer from "multer";
import path from "path";

import { createReciptes, getReciptes } from "../controllers/reciptesController";
import fileStorage from "../middlewares/filesStorage";

const reciptesRouters = express.Router();
const upload = multer({
  dest: path.join("src", "uploads"),
  limits: { fileSize: 800000 },
});

reciptesRouters.get("/getAll", getReciptes);
reciptesRouters.post(
  "/create",
  upload.single("image"),
  fileStorage,
  createReciptes
);

export default reciptesRouters;
