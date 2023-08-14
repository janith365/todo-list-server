import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."]
  }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
