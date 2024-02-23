const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bidders: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      bidAmount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Auction", auctionSchema);
