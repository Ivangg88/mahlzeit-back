import express from "express";
import { validate } from "express-validation";
import registerUser from "../controllers/userControllers";
import usersRegisterSchema from "../schema/userRegisterSchema";

const userRouters = express.Router();

userRouters.post(
  "/register",
  validate(usersRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

export default userRouters;
