import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../../../types/interfaces";
import CustomError from "../../../utils/error";

const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");
  const error = new CustomError(400, "Bad request", "Error of authentication");

  if (!dataAuthentication?.startsWith("Bearer")) {
    next(error);
    return;
  }
  const token = dataAuthentication.slice(7);
  const tokenData = jwt.verify(token, process.env.PRIVATE_KEY);

  if (typeof tokenData === "string") {
    next(error);
    return;
  }

  req.payload = tokenData as CustomRequest;
  next();
};

export default authentication;
