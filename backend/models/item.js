const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  thumbnail: {
    public_id: String,
    url: String,
  },
  condition: {
    type: String,
    enum: ["New", "Used", "Refurbished"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
  },
});

module.exports = mongoose.model("Item", itemSchema);