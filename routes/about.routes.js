const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const {
  createAboutUs,
  updateAboutUs,
  getAboutUs,
} = require("../controllers/about.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/aboutus/";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// get
router.get("/", getAboutUs);
// add
router.post(
  "/add",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profileDoc", maxCount: 1 },
  ]),
  createAboutUs
);
// update
router.patch(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "profileDoc", maxCount: 1 },
  ]),
  updateAboutUs
);

module.exports = router;
