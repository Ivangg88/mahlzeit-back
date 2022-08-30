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

export interface UserResgiter {
  userName: string;
  email: string;
  password: string;
}

export interface UserFromDB extends UserResgiter {
  id: string;
}
