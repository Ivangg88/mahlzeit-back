import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import Debug from "debug";
import chalk from "chalk";
import backupConectionData from "../../../utils/backup";
import CustomError from "../../../utils/error";

const debug = Debug("mahlzeit:server:middlewares:fileStorage");

const supabase = createClient(backupConectionData.url, backupConectionData.key);

export const updateLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Obtener el archivo logs.txt desde Supabase
  const storage = supabase.storage.from("images");
  const fileName = "public/logs.txt";
  const { data, error } = await storage.download(fileName);

  if (error) {
    const errorMessage = new Error(
      `Error downdloading file ${fileName} from supabase.`
    );
    debug(chalk.red(error.message));
    next(errorMessage);
    return;
  }
  const arrayBuffer = await data.arrayBuffer();
  const decoder = new TextDecoder("utf-8");
  const fileContent = decoder.decode(arrayBuffer);
  const newLine = `New request at date ${new Date().toLocaleString()} with method ${
    req.method
  } and origin ${req.headers.host}`;
  const newContent = `${fileContent}\n${newLine}`;

  const updatedData = Buffer.from(newContent, "utf-8");

  const { error: uploadError } = await storage.upload(fileName, updatedData, {
    upsert: true, // Esto sobrescribirá el archivo existente
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

  debug(chalk.green("File updated"));
  next();
};

export default updateLogs;
