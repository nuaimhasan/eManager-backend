const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addContactUs,
  getContactUs,
  updateContactUs,
} = require("../controllers/contact.controller");

router.get("/", getContactUs);
router.post("/add", verifyToken, addContactUs);
router.patch("/:id", verifyToken, updateContactUs);

module.exports = router;
