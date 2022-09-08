import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { RecipteFromDB, RecipteRequest } from "../../types/interfaces";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:controllers:reciptecontroller");

export const getReciptes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reciptes: RecipteFromDB[] = await Recipte.find();
    res.status(201).json(reciptes);

    debug(chalk.bgGreen.white("Request successful!"));
  } catch (error) {
    const findError = new CustomError(
      404,
      error.message,
      "Unable to get the items."
    );

    next(findError);
  }
};

export const createReciptes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipte: RecipteRequest = req.body;

    const itemFromDB = await Recipte.create(recipte);

    res.status(201).json(itemFromDB);
  } catch (error) {
    const createError = new CustomError(
      400,
      error.message,
      "Error creating the item"
    );
    next(createError);
  }
};
