const express = require("express");
const userCol = require("../Models/userModel");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyUsers, verifyAdmin } = require("./verify");
const UserRouter = express.Router();
//Register
UserRouter.post("/register", async (req, res) => {
  const body = req.body;

  if (body.email && body.password) {
    const pass = body.password;
    const password = CryptoJs.AES.encrypt(pass, process.env.PASSKEY).toString();

    const newUser = new userCol({ ...body, password });
    try {
      const userCreated = await newUser.save();
      const { password, ...other } = userCreated._doc;

      const token = jwt.sign(
        { userId: other._id, isAdmin: other.isAdmin },
        process.env.SECRETKEY
      );

      res.status(201).json({ ...other, token });
    } catch (er) {
      res.status(500).json(er);
    }
  } else {
    res.status(400).json({ error: "something went wrong !" });
  }
});

//Login

UserRouter.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const { email, password } = req.body;
    try {
      const user = await userCol.findOne({ email: email });
      if (!user) {
        return res.status(500).json({ error: "user is not exist !" });
      }
      const HashedPass = CryptoJs.AES.decrypt(
        user.password,
        process.env.PASSKEY
      );
      const OrignallPass = HashedPass.toString(CryptoJs.enc.Utf8);

      if (password === OrignallPass) {
        const data = {
          userId: user._id,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(data, process.env.SECRETKEY);
        const { password, ...userData } = user._doc;
       
        res.status(200).json({ ...userData, token });
      } else {
        res.status(500).json({ error: "Your password is not mached " });
      }
    } catch (er) {
      res.status(500).json({ error: "your email not found" });
    }
  } else {
    res.status(400).json({ error: "you missed crdencial !" });
  }
});

UserRouter.post("/", async (req, res) => {
  try {
    const users = await userCol.find();
    res.status(200).json(users);
  } catch (er) {
    res.status(500).json(er);
  }
});

module.exports = UserRouter;
