import express from "express";
import multer from "multer";
import path from "path";

import { createReciptes, getReciptes } from "../controllers/reciptesController";
import fileStorage from "../middlewares/filesStorage";

const reciptesRouters = express.Router();
const upload = multer({
  dest: path.join("public"),
  limits: {
    fileSize: 8000000,
  },
});

reciptesRouters.get("/getAll", getReciptes);
reciptesRouters.post(
  "/create",
  upload.single("file"),
  fileStorage,
  createReciptes
);

export default reciptesRouters;
