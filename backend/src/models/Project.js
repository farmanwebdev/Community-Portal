const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String,   required: true },
    description: { type: String,   required: true },
    category:    { type: String,   enum: ["education", "health", "development"], required: true },
    status:      { type: String,   enum: ["ongoing", "completed"],              default: "ongoing" },
    media:       { type: [String], default: [] },
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
