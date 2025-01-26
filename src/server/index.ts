import cors from "cors";
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import Debug from "debug";
import { errorNotFound, generalError } from "./middlewares/errors";
import reciptesRouters from "./routes/reciptesRouters";
import userRouters from "./routes/userRouters";
import { updateLogs } from "./middlewares/loggerStorage/loggerStorage";

const debug = Debug("mahlzeit:server");

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

debug(chalk.blue(`Allowed origin: ${corsOptions.origin}`));

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/public", express.static("public"));
app.use("/users", userRouters);
app.use("/reciptes", reciptesRouters);
app.head("/logs", updateLogs);

app.use("/", errorNotFound);
app.use(generalError);

export default app;
