import express from "express";
import cors from "cors";
import morgan from "morgan";
import { validate } from "express-validation";
import { generalError, errorNotFound } from "./middlewares/errors";
import userRouters from "./routes/userRouters";
import usersRegisterSchema from "./schema/userRegisterSchema";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  "/users",
  validate(usersRegisterSchema, {}, { abortEarly: false }),
  userRouters
);

app.use("/", errorNotFound);
app.use(generalError);

export default app;
