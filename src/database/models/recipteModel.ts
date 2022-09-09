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

  ingredients: {
    type: Array,
    required: true,
  },

  process: {
    type: Array,
    required: true,
  },
});

const Recipte = model("Recipte", recipteSchema, "reciptes");

export default Recipte;
