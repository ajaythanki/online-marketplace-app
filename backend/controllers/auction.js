const Auction = require("../models/auction");
const { asyncHandler } = require("../utils/middleware");
const logger = require("../utils/logger");

const getAll = asyncHandler(async (req, res, next) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json({
      success: true,
      auctions,
      total:auctions.length
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const create = asyncHandler(async (req, res, next) => {
  const { title, description, startTime, endTime } = req.body;
  const createdBy = req.decodedToken.id;
  try {
    const auction = new Auction({
      title,
      description,
      startTime,
      endTime,
      createdBy,
    });
    await auction.save();
    res.status(201).json({
      success: true,
      message: `Auction Created`,
      auction,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateByID = asyncHandler(async (req, res, next) => {
  const auctionId = req.params.id;
  const { title, description, startTime, endTime } = req.body;
  const createdBy = req.decodedToken.id;

  try {
    const auction = await Auction.findByIdAndUpdate(
      auctionId,
      { title, description, startTime, endTime, createdBy },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Auction Updated",
      auction,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteByID = asyncHandler(async (req, res, next) => {
  const auctionId = req.params.id;
  try {
    await Auction.findByIdAndRemove(auctionId);
    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { getAll, create, updateByID, deleteByID };
