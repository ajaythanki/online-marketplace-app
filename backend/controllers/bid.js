const Bid = require("../models/bid");
const logger = require("../utils/logger");

const getAll = async (req, res, next) => {
  try {
    const bids = await Bid.find();
    res.status(201).json({
      success: true,
      bids,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const create = async (req, res, next) => {
  const { auction, bidAmount } = req.body;
  const user = req.decodedToken.id;
  try {
    const bid = new Bid({ auction, user, bidAmount });
    await bid.save();
    res.status(201).json({
      success: true,
      message: `Auction Created`,
      bid,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const updateByID = async (req, res, next) => {
  const bidId = req.params.id;
  const { auction, bidAmount } = req.body;
  try {
    const bid = await Bid.findByIdAndUpdate(
      bidId,
      { auction, bidAmount },
      { new: true }
    );
    res.json(bid);
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const deleteByID = async (req, res, next) => {
  const bidId = req.params.id;
  try {
    await Bid.findByIdAndRemove(bidId);
    res.json({ message: "Bid deleted successfully" });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
module.exports = { getAll, create, updateByID, deleteByID };