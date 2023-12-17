const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getBlogSection,
  addBlogSection,
  updateBlogSectionById,
} = require("../controllers/blogSection.controller");

router.get("/", getBlogSection);
router.post("/add", verifyToken, addBlogSection);
router.patch("/:id", verifyToken, updateBlogSectionById);

module.exports = router;
