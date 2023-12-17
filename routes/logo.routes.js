const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getLogos,
  addLogo,
  updateLogo,
} = require("../controllers/logo.controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1 * 1024 * 1024 },
});

router.get("/", getLogos);
router.post("/add", upload.single("logo"), addLogo);
router.patch("/update/:id", upload.single("logo"), updateLogo);

module.exports = router;
