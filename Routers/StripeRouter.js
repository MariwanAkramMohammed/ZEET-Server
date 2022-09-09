const express = require("express");
const STRIPEKEY = process.env.STRIPEKEY;
const stripe = require("stripe")(STRIPEKEY);
const StripeRouter = express.Router();

StripeRouter.post("/checkout", async (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (error, data) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

module.exports = StripeRouter;
