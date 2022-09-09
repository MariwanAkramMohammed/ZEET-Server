const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    products: { type: Array },
    allPrice:{type:Number,default:30}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
