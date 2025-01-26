import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import Debug from "debug";
import chalk from "chalk";
import { createClient } from "@supabase/supabase-js";
import CustomError from "../../utils/error";
import backupConectionData from "../../utils/backup";
import processFile from "./imageFormatter/formatImage";

const debug = Debug("mahlzeit:server:middlewares:fileStorage");

const supabase = createClient(backupConectionData.url, backupConectionData.key);

const imageBucket = backupConectionData.imageBucketName;

export const fileStorage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file || !req.file.filename || !req.file.originalname) {
    next(
      new CustomError(400, "Bad request", "Request not valid, file not found")
    );
    return;
  }

  const tempFilePath = `${req.file?.originalname.split(" ").join("-")}`;

  await fs.rename(
    path.join("public", req.file?.filename),
    path.join("public", tempFilePath)
  );

  const file = await fs.readFile(`public/${tempFilePath}`);

  const { buffer, fileName } = await processFile(file, tempFilePath);

  const newUpdatedFileName = `${req.body.autor}-${Date.now()}-${fileName}`;
  const newFilePath = path.join("public", newUpdatedFileName);

  await fs.rename(`public/${tempFilePath}`, newFilePath);

  const storage = supabase.storage.from(imageBucket);

  req.body.image = storage.getPublicUrl(newFilePath).publicURL;
  req.body.backupImage = req.body.image;

  const uploadResult = await storage.upload(newFilePath, buffer);
  if (uploadResult.error) {
    const fileError = new CustomError(
      400,
      uploadResult.error.message,
      "Error reading the file"
    );
    next(fileError);
    return;
  }
  try {
    await fs.unlink(newFilePath);
  } catch (error) {
    debug(chalk.red(`File: ${newFilePath} not found.`));
  }
  debug(chalk.green("File uploaded sucessfully"));
  next();
};

export const deleteFile = async (filePath: string) => {
  try {
    const { error: supabaseError } = await supabase.storage
      .from(imageBucket)
      .remove([filePath]);

    debug(chalk.green(`File ${filePath} removed from backup.`));

    if (supabaseError) {
      debug(chalk.red(`Error removing the file ${filePath} from backup.`));
      debug(chalk.red(`${supabaseError.name} ${supabaseError.message}`));
    }

    await fs.unlink(filePath);
    debug(chalk.green(`File ${filePath} removed from server.`));
  } catch (error) {
    debug(chalk.red("Error removing the file from the server."));
    debug(chalk.red(`${error.name} ${error.message}`));
  }
};
export default fileStorage;
