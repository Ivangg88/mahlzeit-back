import { model, Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  persons: {
    type: Number,
    require: true,
  },

  dificulty: {
    type: String,
    require: true,
  },

  autor: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true,
  },

  ingredients: {
    type: Array,
    require: true,
  },

  process: {
    type: Array,
    require: true,
  },
});

const Item = model("Item", itemSchema, "items");

export default Item;
