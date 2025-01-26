import { model, Schema } from "mongoose";
import { Ingredient, Process } from "../../types/interfaces";

const recipteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  persons: {
    type: Number,
    required: true,
  },

  dificulty: {
    type: String,
    required: true,
  },

  autor: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  backupImage: {
    type: String,
  },

  ingredients: {
    type: Array<Ingredient>,
    required: true,
  },

  process: {
    type: Array<Process>,
    required: true,
  },

  authorId: {
    type: String,
    require: true,
  },
});

const Recipte = model("Recipte", recipteSchema, "reciptes");

export default Recipte;
