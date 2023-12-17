const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

const {
  getServiceBanner,
  addServiceBanner,
  updateServiceBanner,
} = require("../controllers/serviceBanner.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/serviceBanner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1 * 1024 * 1024 },
});

router.get("/", getServiceBanner);

router.post(
  "/add",
  verifyToken,
  upload.single("serviceBanner"),
  addServiceBanner
);

router.patch(
  "/:id",
  verifyToken,
  upload.single("serviceBanner"),
  updateServiceBanner
);

module.exports = router;
