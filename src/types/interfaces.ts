import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ICustomError extends Error {
  statusCode: number;
  publicMessage?: string;
  privateMessage?: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Process {
  process: string;
  picture: string;
  backupPicture: string;
}

export interface RecipteRequest {
  name: string;
  persons: number;
  dificulty: string;
  autor: string;
  ingredients: Ingredient[];
  process: Process[];
  image: string;
}

export interface RecipteFromDB extends RecipteRequest {
  id: string;
  backupImage: string;
}

export interface UserResgiter {
  userName: string;
  email: string;
  password: string;
}

export interface CustomJwtPayload {
  id: string;
  userName: string;
}

export interface UserFromDB extends UserResgiter {
  id: string;
}

export type UserLogin = Omit<UserResgiter, "email">;

export interface CustomRequest extends Request {
  payload: JwtPayload;
}
