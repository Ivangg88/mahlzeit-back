import { NextFunction, Request, Response } from "express";
import User from "../../database/models/userModel";
import { UserResgiter } from "../../types/interfaces";
import hashCreator from "../../utils/authentication";
import CustomError from "../../utils/error";

const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const user: UserResgiter = req.body;

  try {
    user.password = await hashCreator(user.password);
    await User.create(user);
    res.status(200).json({
      user: {
        name: user.userName,
        message: `User ${user.userName} registered sucessfully.`,
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
