import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";

const debug = Debug("mahlzeit:server:middlewares:errors");

const errorNotFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Error endpoint not found" });
  debug(chalk.red("Error 404 endpoint not found"));
};

export default errorNotFound;
