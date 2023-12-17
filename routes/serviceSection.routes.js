const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const {
  addServiceSection,
  getServiceSections,
  updateServiceSectionById,
} = require("../controllers/serviceSection.controller");

router.post("/add", verifyToken, addServiceSection);
router.get("/", getServiceSections);
router.patch("/:id", verifyToken, updateServiceSectionById);

module.exports = router;
