const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  getAllWhyChoose,
  createWhyChoose,
  updateWhyChoose,
  deleteWhyChoose,
  getWhyChooseById,
} = require("../controllers/whyChoose.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/whychoose");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAllWhyChoose);
router.post("/add", verifyToken, upload.single("whyChoose"), createWhyChoose);
router.patch("/:id", verifyToken, upload.single("whyChoose"), updateWhyChoose);
router.delete("/:id", verifyToken, deleteWhyChoose);
router.get("/:id", getWhyChooseById);

module.exports = router;
