import { Joi } from "express-validation";

const usersSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default usersSchema;
