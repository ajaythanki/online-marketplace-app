const User = require("../models/user");
const { uploadImage, deleteImage } = require("../utils/helper");
const { asyncHandler } = require("../utils/middleware");

// Retrieve all users from the database
const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();

    // Send the users as a response
    res.status(200).json({ success: true, message: "All Users", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// route: GET /users/:id || Get User by UserID
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Retrieve the user with the specified ID from the database
    const user = await User.findById(userId);

    // Send the user as a response
    res
      .status(200)
      .json({ success: true, message: `Get user with ID ${userId}`, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// route: PATCH /users/updateProfile
const updateUserProfile = async (req, res, next) => {
  try {
    // Extract necessary data from the request body
    const { name, avatar } = req.body;

    const user = await User.findById(req.decodedToken.id);
    if (user?.avatar) {
      await deleteImage(user.avatar.public_id);
    } 
    
      const uploadResult = await uploadImage(avatar, "avatars");
      user.name = name;
      user.avatar = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
      const updatedUser = await user.save();
      // Send a success message and the updated user as a response
      res.status(200).json({
        success: true,
        message: `Profile updated`,
        user: updatedUser,
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const userController = {
  getAllUsers,
  getUserById,
  updateUserProfile,
};

module.exports = userController;
