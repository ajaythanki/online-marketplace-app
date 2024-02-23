const router = require("express").Router();
const {
  create,
  getAll
} = require("../controllers/auction");
const { isAuth, verifyToken } = require("../utils/middleware");
router
  .get("/", verifyToken, isAuth, getAll) // route: GET Retrieve All Auctions from the database
  .post("/", verifyToken, isAuth, create) // route: POST || Create Auction

module.exports = router;
