import chalk from "chalk";
import Debug from "debug";
import { Request, Response } from "express";
import Item from "../../database/models/itemModel";

const debug = Debug("mahlzeit:server:controllers:itemcontroller");

const getItems = async (req: Request, res: Response) => {
  const items = await Item.find({});

  await res.status(200).json(items);

  await debug(chalk.bgGreen.white("Request successful!"));
};

export default getItems;
