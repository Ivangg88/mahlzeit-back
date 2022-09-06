import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Item from "../../database/models/itemModel";
import CustomError from "../../utils/error";

const debug = Debug("mahlzeit:server:controllers:itemcontroller");

const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Item.find({});
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

export default getItems;
