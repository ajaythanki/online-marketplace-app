const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["Purchase", "Sale", "Bid"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  relatedAuction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
