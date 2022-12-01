import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "./error";

export interface CustomRequest extends Request {
  payload: JwtPayload;
}

export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");
  const error = new CustomError(400, "Bad request", "Error of authentication");

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer")) {
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