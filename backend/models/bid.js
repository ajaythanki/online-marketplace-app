const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
