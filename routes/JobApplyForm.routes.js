const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const {
  addJobApplyForm,
  getJobApplyForms,
  getJobApplyFormById,
  deleteJobApplyForm,
} = require("../controllers/JobApplyForm.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/jobresume");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("resume"), addJobApplyForm);
router.get("/", getJobApplyForms);
router.get("/:id", getJobApplyFormById);
router.delete("/:id", verifyToken, deleteJobApplyForm);

module.exports = router;
