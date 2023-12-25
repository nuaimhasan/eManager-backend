const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const {
  getAllTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/team.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/team");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all-teamMembers", getAllTeamMembers);
router.post("/add", upload.single("image"), addTeamMember);
router.patch("/update/:id", upload.single("image"), updateTeamMember);
router.delete("/delete/:id", deleteTeamMember);
router.get("/:id");

module.exports = router;
