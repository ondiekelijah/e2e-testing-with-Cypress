const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    message: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
