const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");

const {
  addBenefit,
  getBenefits,
  getBenefitById,
  updateBenefit,
  deleteBenefit,
} = require("../controllers/jobBenefit.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/benefit");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyToken, upload.single("benefit"), addBenefit);
router.get("/", getBenefits);
router.get("/:id", getBenefitById);
router.patch("/:id", verifyToken, upload.single("benefit"), updateBenefit);
router.delete("/:id", verifyToken, deleteBenefit);

module.exports = router;
