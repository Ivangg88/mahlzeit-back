import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Item from "../../database/models/itemModel";
import { ItemFromDB } from "../../types/interfaces";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:controllers:itemcontroller");

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items: ItemFromDB[] = await Item.find();
    res.status(201).json(items);

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

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = req.body;
    const itemFromDB = await Item.create(item);

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
