import express from "express";
import Debug from "debug";
import chalk from "chalk";

export const app = express();
app.disable("x-powered-by");

const debug = Debug("mahlzeit:startServer");

export const startServer = (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Listening on the port ${port}`));
      resolve(true);
    });

    server.on("error", (error) => {
      debug(chalk.red("Error with the server: ", error.message));
      reject(error);
    });
  });
