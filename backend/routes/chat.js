const router = require("express").Router();
const {
  create,
  getAll
} = require("../controllers/chat");
const { isAuth, verifyToken } = require("../utils/middleware");
router
  .get("/", verifyToken, isAuth, getAll) // route: GET Retrieve All Auctions from the database
  .post("/", verifyToken, isAuth, create) // route: POST || Create Auction
  // .get("/:id", verifyToken, isAuth, getUserById) // route: GET || Get User by UserID
  // .put("/:id", verifyToken, isAuth, updateUserById) // route: PUT || Update User by UserID
  // .delete("/:id", verifyToken, isAuth, deleteUserById); // route: DELETE || Delete User

module.exports = router;
