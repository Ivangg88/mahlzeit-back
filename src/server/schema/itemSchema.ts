import { Joi } from "express-validation";

const itemSchema = {
  body: Joi.object({
    ingredients: Joi.array().required(),
    process: Joi.array().required(),
  }),
};

export default itemSchema;
