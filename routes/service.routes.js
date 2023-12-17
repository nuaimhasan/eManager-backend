const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const {
  getAllServices,
  addService,
  updateServiceById,
  getServiceById,
  getServiceBySlug,
  deleteServiceById,
} = require("../controllers/service.controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "./uploads/services";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1 * 1024 * 1024 },
});

// get all
router.get("/all-services", getAllServices);
// Add
router.post(
  "/add",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  addService
);
// update
router.patch(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  updateServiceById
);
// get by id and slug
router.get("/:id", getServiceById);
router.get("/slug/:slug", getServiceBySlug);
// delete
router.delete("/:id", verifyToken, deleteServiceById);

module.exports = router;
