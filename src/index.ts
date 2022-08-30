import "./loadEnvironment";
import chalk from "chalk";
import Debug from "debug";
import { startServer } from "./server/startServer";

const debug = Debug("mahlzeit:index");

debug(chalk.red("Holi desde debug"));

const port = +process.env.PORT;

startServer(port);
