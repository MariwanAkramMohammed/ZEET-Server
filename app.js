const express = require("express");
const cors = require("cors");
const ProductRouter = require("./Routers/ProductRouter");
const UserRouter = require("./Routers/UserRouter");
const StripeRouter = require("./Routers/StripeRouter");
const OrderRouter = require("./Routers/OrderRouter");
const CommentRouter = require("./Routers/CommentRouter");
const { verifyUsers, verifyAdmin } = require("./Routers/verify");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/payment", StripeRouter);
app.use("/order", OrderRouter);
app.use("/comment", CommentRouter);

module.exports = app;
