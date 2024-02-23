const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
} = require("../controllers/users");
const { verifyToken } = require("../utils/middleware");
router
  .get("/", verifyToken, getAllUsers) // route: GET api/users/ - Retrieve all users from the database
  .get("/:id", verifyToken, getUserById) // route: GET api//users/:id - Get User by UserID
  .patch("/update-profile",verifyToken, updateUserProfile) // route: PATCH api//users/updateProfile - Update User Profile

module.exports = router;
