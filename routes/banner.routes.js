const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addBanner,
  getBanner,
  updateBanner,
} = require("../controllers/banner.controller");

router.post("/add", verifyToken, addBanner);
router.get("/", getBanner);
router.patch("/:id", verifyToken, updateBanner);

module.exports = router;
