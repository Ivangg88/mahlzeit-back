import axios from "axios";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("mahlzeit:noSleepMode");
const noSleepMode = (): void => {
  setInterval(() => {
    axios
      .get("https://mahlzeit-back-dev-qssa.1.us-1.fl0.io/reciptes/getAll", {
        headers: { Connection: "keep-alive" },
      })
      .then(() => debug(chalk.greenBright("Server reanimated.")))
      .catch((error) => {
        debug(chalk.red(`Error reanimating the server.`));
        debug(chalk.red(`Error:${error.message}`));
      });
  }, 36000000);
};

export default noSleepMode;
