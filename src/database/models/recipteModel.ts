import { model, Schema } from "mongoose";

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
    type: String,
    required: true,
  },

  process: {
    type: String,
    required: true,
  },
});

const Recipte = model("Recipte", recipteSchema, "reciptes");

export default Recipte;
