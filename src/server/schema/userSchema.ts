import { Joi } from "express-validation";

export const usersRegisterSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const userLoginSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};
