const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addAdministrator,
  adminLogin,
  deleteAdmin,
  getAdmins,
  getLoggedUser,
} = require("../controllers/Administrator.controller");

router.post("/add", verifyToken, addAdministrator);
router.post("/login", adminLogin);
router.delete("/:id", verifyToken, deleteAdmin);
router.get("/", verifyToken, getAdmins);
router.get("/loggedUser", verifyToken, getLoggedUser);

module.exports = router;
