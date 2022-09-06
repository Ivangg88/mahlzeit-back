import { model, Schema } from "mongoose";

const itemSchema = new Schema({
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
