import { Joi } from "express-validation";

const usersRegisterSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};

export default usersRegisterSchema;
