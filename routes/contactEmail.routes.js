const express = require("express");
const router = express.Router();
const { clientMessage } = require("../controllers/contactEmail.controller");

router.post("/add", clientMessage);

module.exports = router;
