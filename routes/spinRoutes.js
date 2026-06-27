// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");

// const {
//   spinWheel,
//   getSpinHistory,
// } = require("../controllers/spinController");

// // 🎰 SPIN
// router.post("/spin", protect, spinWheel);

// // 📊 HISTORY
// router.get("/", protect, getSpinHistory);

// module.exports = router;

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  spinWheel,
  getSpinHistory
} = require("../controllers/spinController");

router.post("/spin", protect, spinWheel);

router.get("/", protect, getSpinHistory);

module.exports = router;