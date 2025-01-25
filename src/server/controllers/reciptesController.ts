import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { RecipteRequest } from "../../types/interfaces";
import CustomError from "../../utils/error";
import { deleteFile } from "../middlewares/filesStorage";

const debug = Debug("mahlzeit:server:controllers:reciptecontroller");

export const getReciptes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  try {
    const reciptes = await Recipte.find();

    res.status(201).json({ reciptes });

    debug(chalk.bgGreen.white("Request successful!"));
    return true;
  } catch (error) {
    const findError = new CustomError(
      404,
      error.message,
      "Unable to get the items."
    );

    next(findError);
    return false;
  }
};

export const createReciptes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  try {
    const recipte: RecipteRequest = req.body;
    recipte.ingredients = JSON.parse(req.body.ingredients);
    recipte.process = JSON.parse(req.body.process);

    debug(chalk.green("Recipte create sucessfully"));

    const recipteFromDB = await Recipte.create(recipte);

    res.status(200).json(recipteFromDB);
    return true;
  } catch (error) {
    const createError = new CustomError(
      400,
      error.message,
      "Error creating the item"
    );
    next(createError);
    return false;
  }
};

export const deleteRecipte = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  try {
    const { id } = req.query;

    const recipte = await Recipte.findById(id);
    if (!recipte) {
      throw new Error("Recipte not found");
    }

    await deleteFile(recipte.image);

    await Recipte.findByIdAndDelete(id);

    res.status(201).json({ Message: "Recipte has been succesfully deleted" });
    return true;
  } catch (error) {
    const deleteError = new CustomError(
      404,
      error.message,
      "Error deleting the recipte"
    );

    next(deleteError);
    return false;
  }
};

export const getRecipteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  const { id } = req.params;

  try {
    const recipte = await Recipte.findById(id);
    res.status(200).json({ recipte });
    return true;
  } catch (error) {
    const customError = new CustomError(
      404,
      error.message,
      "Error finding the recipte"
    );
    next(customError);
    return false;
  }
};
