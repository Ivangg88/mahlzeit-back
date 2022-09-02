import express from "express";
import { validate } from "express-validation";
import { loginUser, registerUser } from "../controllers/userControllers";
import { userLoginSchema, usersRegisterSchema } from "../schema/userSchema";

const userRouters = express.Router();

userRouters.post(
  "/register",
  validate(usersRegisterSchema, {}, { abortEarly: false }),
  registerUser
);

userRouters.post(
  "/login",
  validate(userLogin
    Schema, {}, { abortEarly: false }),
  loginUser
);

export default userRouters;
