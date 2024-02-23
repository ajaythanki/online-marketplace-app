const router = require("express").Router();
const {
  create,
  getAll,
  updateByID,
  updateThumbnail,
} = require("../controllers/item");
const { isAuth, verifyToken } = require("../utils/middleware");
router
  .get("/", getAll) // route: GET /api/items - Retrieve All Items from the database
  .post("/", verifyToken, isAuth, create) // route: POST /api/items/create - Create Item
  .put("/:id", verifyToken, isAuth, updateByID) // route: PUT /api/items/:id - Update Item by Item Id
  .put("/update-thumbnail/:id", verifyToken, isAuth, updateThumbnail); // route: POST /api/items/update-thumbnail/:id - Update Item Image by Item Id

module.exports = router;