import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../../database/models/userModel";
import { UserResgiter } from "../../types/interfaces";
import CustomError from "../../utils/error";

const registerUser = async (
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
      user: {
        name: user.userName,
        message: `User ${user.userName} was registered sucessfully.`,
      },
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

export default registerUser;
