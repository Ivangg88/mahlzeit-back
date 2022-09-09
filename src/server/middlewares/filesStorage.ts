import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import Debug from "debug";
import chalk from "chalk";
import { createClient } from "@supabase/supabase-js";
import CustomError from "../../utils/error";
import backupConectionData from "../../utils/backup";

const debug = Debug("mahlzeit:server:middlewares:fileStorage");

const supabase = createClient(backupConectionData.url, backupConectionData.key);

const fileStorage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newFileName = `${Date.now()}-${req.file.originalname
      .split(" ")
      .join("-")}`;

    await fs.rename(
      path.join("uploads", req.file.filename),
      path.join("uploads", newFileName)
    );

    debug(chalk.blue(`File ${req.file.filename} rename to ${newFileName}`));

    const filePath = path.join("uploads", newFileName);

    req.body.image = filePath;

    const file = await fs.readFile(filePath);

    const storage = supabase.storage.from("images");

    const uploadResult = await storage.upload(filePath, file);

    req.body.backupImage = storage.getPublicUrl(filePath).publicURL;

    if (uploadResult.error) {
      next(uploadResult.error);
      return;
    }
    debug(chalk.green("File uploaded sucessfully"));
  } catch (error) {
    const fileError = new CustomError(
      400,
      error.message,
      "Error reading the file"
    );

    next(fileError);
    return;
  }
  next();
};

export default fileStorage;
