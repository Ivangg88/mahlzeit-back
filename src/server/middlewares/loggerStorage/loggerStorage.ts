import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import Debug from "debug";
import chalk from "chalk";
import backupConectionData from "../../../utils/backup";
import CustomError from "../../../utils/error";

const debug = Debug("mahlzeit:server:middlewares:loggerStorage");

const supabase = createClient(backupConectionData.url, backupConectionData.key);
const bucket = backupConectionData.imageBucketName;

export const updateLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const storage = supabase.storage.from(bucket);
  const fileName = "public/logs.txt";

  const newContent = `Last request at date ${new Date().toLocaleString()} with method ${
    req.method
  } and origin ${req.headers.host}`;

  const updatedData = Buffer.from(newContent, "utf-8");

  const { error: uploadError } = await storage.upload(fileName, updatedData, {
    upsert: true,
  });

  if (uploadError) {
    const fileError = new CustomError(
      400,
      uploadError.message,
      "Error uploading the file log"
    );
    debug(`${uploadError.message}`);
    next(fileError);
    return;
  }

  debug(chalk.green(`File updated with: "${newContent}"`));
  res.setHeader("response", JSON.stringify(newContent));
  res.status(201).end();
};

export default updateLogs;
