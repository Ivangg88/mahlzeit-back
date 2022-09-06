import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, errorNotFound } from "./middlewares/errors";
import userRouters from "./routes/userRouters";
import itemsRouters from "./routes/itemsRouters";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouters);
app.use("/items", itemsRouters);

app.use("/", errorNotFound);
app.use(generalError);

export default app;
