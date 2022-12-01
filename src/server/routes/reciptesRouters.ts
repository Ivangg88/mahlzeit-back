import express from "express";
import multer from "multer";
import path from "path";
import authentication from "../middlewares/authentication/authentication";

import {
  createReciptes,
  deleteRecipte,
  getRecipteById,
  getReciptes,
} from "../controllers/reciptesController";
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
  authentication,
  upload.single("file"),
  fileStorage,
  createReciptes
);

reciptesRouters.delete("/delete", authentication, deleteRecipte);

reciptesRouters.get("/getById/:id", getRecipteById);

export default reciptesRouters;
