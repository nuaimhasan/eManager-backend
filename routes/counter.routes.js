const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

const {
  createCounter,
  updateCounter,
  deleteCounter,
  getCounterById,
  getAllCounters,
} = require("../controllers/counter.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/counter");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all-counters", getAllCounters);
router.post("/add", verifyToken, upload.single("icon"), createCounter);
router.patch("/:id", verifyToken, upload.single("icon"), updateCounter);
router.delete("/:id", verifyToken, deleteCounter);
router.get("/:id", getCounterById);

module.exports = router;
