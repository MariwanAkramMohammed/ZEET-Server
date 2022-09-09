const express = require("express");
const { verifyUsers } = require("./verify");
const Order_OC = require("../Models/OrderMode");
const OrderRouter = express.Router();

OrderRouter.post("/", verifyUsers, async (req, res) => {
  const { token, ...others } = await req.body;
  const newOrder = new Order_OC(others);
  try {
    const orderSaved = await newOrder.save();
    res.status(200).json(orderSaved);
  } catch (er) {
    res.status(500).json({ error: "your data has not saved !" });
  }
});
OrderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order_OC.find();
    res.status(200).json(orders);
  } catch (er) {
    res.status(500).json(er);
  }
});
module.exports = OrderRouter;
