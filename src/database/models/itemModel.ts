import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },

  ingredients: {
    ingredientList: Array,
    require: true,
  },

  process: {
    steps: Array,
  },
});

const Item = model("Item", userSchema, "items");

export default Item;
