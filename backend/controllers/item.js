const Item = require("../models/item");
const ErrorHandler = require("../utils/ErrorHandler");
const { uploadImage, deleteImage } = require("../utils/helper");
const logger = require("../utils/logger");

const getAll = async (req, res, next) => {
  try {
    const items = await Item.find();
    items.length
    res.status(200).json({
      success: true,
      items,
      total:items.length
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const create = async (req, res, next) => {
  const { name, description, startingPrice, condition, category, auction, thumbnail } =
    req.body;
  const createdBy = req.decodedToken.id;
  if (
    !name ||
    !description ||
    !startingPrice ||
    !condition ||
    !category ||
    !thumbnail
  ) {
    return next(
      new ErrorHandler("Please provide all the required fields", 400)
    );
  }
  try {
    const item = new Item({
      name,
      description,
      startingPrice,
      condition,
      category,
      createdBy,
      auction,
    });

    const uploadResult = await uploadImage(thumbnail, "thumbnails");
      item.thumbnail = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };

    await item.save();
    res.status(201).json({
      success: true,
      message: `Item Created`,
      item,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

const updateByID = async (req, res, next) => {
  const itemId = req.params.id;
  const { name, description, startingPrice, condition, category, auction, thumbnail } =
    req.body;
  try {
    if(name || description || startingPrice || condition || category || auction){
      const item = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });
      res.status(201).json({
        success: true,
        message: `Item Updated`,
        item,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const updateThumbnail = async (req, res, next) => {
  const itemId = req.params.id;
  const { thumbnail } =  req.body;
  try {
    if(!thumbnail){
      return next(
        new ErrorHandler("Please provide thumbnail", 400)
      );
    }
      const item = await Item.findById(itemId);

      if (item.thumbnail?.public_id) {
        await deleteImage(item.thumbnail.public_id);
      } 
      
        const uploadResult = await uploadImage(thumbnail, "thumbnails");
        item.thumbnail = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
        await item.save()
    res.status(201).json({
      success: true,
      message: `Item Updated`,
      item,
    });
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};
const deleteByID = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findById(itemId);
    if(item){

      await Item.findByIdAndRemove(itemId);
      if (item.thumbnail) {
        await deleteImage(user.avatar.public_id);
      } 
      res.status(200).json({
        success: true,
        message: `Item Deleted`,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

module.exports = { getAll, create, updateByID, deleteByID, updateThumbnail };