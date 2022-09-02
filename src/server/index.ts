import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, errorNotFound } from "./middlewares/errors";
import userRouters from "./routes/userRouters";

const app = express();

const whitelist = ["https://igarcia-final-project-202207.netlify.app"];

const checkOrigin = (origin: string) => {
  if (whitelist.includes(origin)) {
    return origin;
  }
  return new Error("Not allowed by CORS");
};

const corsOptions = {
  origin: checkOrigin(whitelist[0]) as string,
};

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouters);

app.use("/", errorNotFound);
app.use(generalError);

export default app;
