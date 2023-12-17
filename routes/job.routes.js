const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addJob,
  updateJob,
  deleteJob,
  getJobById,
  getJobs,
} = require("../controllers/job.controller");

router.get("/all-jobs", getJobs);
router.post("/add", verifyToken, addJob);
router.patch("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);
router.get("/:id", getJobById);

module.exports = router;
