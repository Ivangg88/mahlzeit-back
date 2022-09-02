import express from "express";
import { validate } from "express-validation";
import { loginUser, registerUser } from "../controllers/userControllers";
import usersRegisterSchema from "../schema/userRegisterSchema";

const userRouters = express.Router();

userRouters.post(
  "/register",
  validate(usersRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

userRouters.post("/login", loginUser);

export default userRouters;
