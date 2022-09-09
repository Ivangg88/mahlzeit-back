import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import Debug from "debug";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:middlewares:fileStorage");

const fileStorage = (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(req.file);
    const newFileName = `${Date.now()}-${req.file.originalname}`;

    fs.rename(
      path.join("src", "uploads", req.file.filename),
      path.join("src", "uploads", newFileName)
    );
  } catch (error) {
    const fileError = new CustomError(
      400,
      error.message,
      "Error reading the file"
    );
    next(fileError);
    return;
  }

  next(req);
};

export default fileStorage;
