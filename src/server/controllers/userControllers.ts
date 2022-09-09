import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/userModel";
import {
  CustomJwtPayload,
  UserFromDB,
  UserLogin,
  UserResgiter,
} from "../../types/interfaces";
import CustomError from "../../utils/error";

export const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user: UserResgiter = req.body;
  const salt = 10;
  try {
    user.password = await bcryptjs.hash(user.password, salt);
    await User.create(user);
    res.status(201).json({
      message: `User ${user.userName} was registered sucessfully.`,
    });
  } catch (error) {
    const customError = new CustomError(
      400,
      "Error with register user.",
      error.message
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user = req.body as UserLogin;

  let foundUser: UserFromDB;
  const userError = new CustomError(
    403,
    "Error with the authentication",
    "User not found"
  );

  try {
    foundUser = await User.findOne({ userName: user.userName });
    if (foundUser === null) {
      next(userError);
      return;
    }
  } catch (error) {
    const customError = new CustomError(
      403,
      "User or password not found.",
      error.message
    );
    next(customError);
    return;
  }

  try {
    const isValidPassword = await bcryptjs.compare(
      user.password,
      foundUser.password
    );

    if (!isValidPassword) {
      userError.message = "Password invalid";
      next(userError);
      return;
    }
  } catch (error) {
    userError.message = error.message;
    next(userError);
  }

  const payLoad: CustomJwtPayload = {
    id: foundUser.id,
    userName: foundUser.userName,
  };

  const responseData = {
    token: jwt.sign(payLoad, process.env.PRIVATE_KEY),
  };

  res.status(200).json(responseData);
};
