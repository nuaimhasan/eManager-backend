const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addCareerBanner,
  getCareerBanner,
  updateCareerBanner,
} = require("../controllers/careerBanner.controller");

router.post("/add", verifyToken, addCareerBanner);
router.get("/", getCareerBanner);
router.patch("/:id", verifyToken, updateCareerBanner);

module.exports = router;
