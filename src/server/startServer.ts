import Debug from "debug";
import chalk from "chalk";
import app from ".";

const debug = Debug("mahlzeit:startServer");

const startServer = (port: number) =>
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

export default startServer;
