const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status:  { type: String, enum: ["pending", "read"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
