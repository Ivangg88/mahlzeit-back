import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:middlewares:errors");

export const errorNotFound = (req: Request, res: Response): void => {
  res.status(404).json({ message: "Error endpoint not found" });
  debug(chalk.red("Error 404 endpoint not found"));
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let errorCode = error.statusCode ?? 500;
  let errorMessage = error.publicMessage ?? "General error.";

  if (error instanceof ValidationError) {
    errorCode = 400;
    errorMessage = "Wrong data";
    const {
      details: { body },
    } = error;
    body.forEach((errorElement) =>
      debug(chalk.red(`Validation error: ${errorElement.message} `))
    );
  }

  debug(chalk.red(error.message));

  res.status(errorCode).json({ error: errorMessage });
};
