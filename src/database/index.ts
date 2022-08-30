import "../loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import mongoose from "mongoose";

const debug = Debug("mahlzeit:database:index");

const connectDB = (url: string): Promise<unknown> =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newDocument = { ...ret };

        // eslint-disable-next-line no-underscore-dangle
        delete newDocument.__v;
        // eslint-disable-next-line no-underscore-dangle
        delete newDocument._id;
        delete newDocument.password;
        return newDocument;
      },
    });

    mongoose.connect(url, (error) => {
      if (error) {
        debug(chalk.bgRed.white("Could not connect with database"));
        reject(error);
        return;
      }

      debug(chalk.bgGreen.white("Connected to the database"));
      resolve(true);
    });
  });

export default connectDB;
