import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Recipte from "../../database/models/recipteModel";
import { CustomRequest, RecipteRequest } from "../../types/interfaces";
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
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  try {
    const recipe: RecipteRequest = req.body;
    const { id, userName } = req.payload;

    recipe.ingredients = JSON.parse(req.body.ingredients);
    recipe.process = JSON.parse(req.body.process);
    recipe.authorId = id;
    recipe.autor = userName;

    const recipteFromDB = await Recipte.create(recipe);

    debug(
      chalk.green(`Recipte create sucessfully for the user  ${recipe.autor}`)
    );

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

export const getRecipesByAuthorId = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  try {
    const { id, userName } = req.payload;
    const recipes = await Recipte.find({ authorId: id });

    debug(chalk.green(`Recipes for user ${userName} founded sucessfully`));

    res.status(200).json(recipes);
    return true;
  } catch (error) {
    const findError = new CustomError(
      400,
      error.message,
      "Error searching the recipes"
    );
    next(findError);
    return false;
  }
};
