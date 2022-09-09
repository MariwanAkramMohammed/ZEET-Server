const express = require("express");
const CommentCol_Obj = require("../Models/CommentModel");
const { verifyUsers, verifyAdmin } = require("./verify");
const CommentRouter = express.Router();
CommentRouter.post("/", verifyUsers, async (req, res) => {
  const NewComment = new CommentCol_Obj(req.body);
  try {
    const CommentSaved = await NewComment.save();
    res.status(200).json({ done: "your comment has saved " });
  } catch (er) {
    res.status(500).json(er);
  }
});

CommentRouter.get("/", async (req, res) => {
  try {
    const comment = await CommentCol_Obj.find().limit(3);
    res.status(200).json(comment);
  } catch (er) {
    res.status(500).json(er);
  }
});

module.exports = CommentRouter;
