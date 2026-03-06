const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    contributorName: { type: String,  required: true },
    amount:          { type: Number,  required: true },
    purpose:         { type: String,  enum: ["hunting", "expedition", "donation"], required: true },
    date:            { type: Date,    default: Date.now },
    addedBy:         { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contribution", contributionSchema);
