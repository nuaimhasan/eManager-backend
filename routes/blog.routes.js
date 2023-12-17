const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");

const {
  addBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blogs");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyToken, upload.single("image"), addBlog);
router.get("/all-blogs", getBlogs);
router.get("/:id", getBlogById);
router.patch("/:id", verifyToken, upload.single("blog"), updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

module.exports = router;
