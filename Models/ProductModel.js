const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true, unique: true },
    category: { type: Array, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Array, required: true },
    color: { type: Array, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
