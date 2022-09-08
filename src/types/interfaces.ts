export interface ICustomError extends Error {
  statusCode: number;
  publicMessage?: string;
  privateMessage?: string;
}

type Units = "ml" | "l" | "g" | "Kg" | "ud" | "uds";
export interface Ingredient {
  name: string;
  quantity: number;
  units: Units;
}

export interface Process {
  steps: string[];
}

export interface ItemRequest {
  name: string;
  persons: number;
  dificulty: "Fácil" | "Medio" | "Difícil";
  autor: string;
  image: string;
  ingredients: Ingredient[];
  process: Process;
}

export interface ItemFromDB extends ItemRequest {
  id: string;
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
