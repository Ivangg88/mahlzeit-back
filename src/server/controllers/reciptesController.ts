import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:controllers:reciptecontroller");

export const getReciptes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reciptes = await Recipte.find();
    res.status(201).json({ reciptes });

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
    const recipte = req.body;
    recipte.persons = Number.parseInt(recipte.persons, 2);

    const recipteFromDB = await Recipte.create(recipte);
    res.status(200).json(recipteFromDB);
  } catch (error) {
    const createError = new CustomError(
      400,
      error.message,
      "Error creating the item"
    );
    next(createError);
  }
};
