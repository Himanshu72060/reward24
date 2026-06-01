const express = require("express");
const router = express.Router();

const controller = require("../controllers/adConfigController");

// CREATE
router.post("/create", controller.createAdConfig);

// GET (FINAL APP RESPONSE)
router.get("/", controller.getAdConfig);

// UPDATE
router.put("/update", controller.updateAdConfig);

module.exports = router;