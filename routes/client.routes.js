const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const {
  addClient,
  getClients,
  deleteClient,
} = require("../controllers/client.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/clients");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/add", verifyToken, upload.single("client"), addClient);
router.get("/all-clients", getClients);
router.delete("/:id", verifyToken, deleteClient);

module.exports = router;
