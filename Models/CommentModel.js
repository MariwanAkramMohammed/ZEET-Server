const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    comment: { type: String, required: true },
    range: { type: Number, required: true },
    public: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", CommentSchema);
