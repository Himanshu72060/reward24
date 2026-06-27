const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getWallet,
    getCoinHistory,
    getCoinSources
} = require("../controllers/walletController");

router.get("/", auth, getWallet);

router.get("/history", auth, getCoinHistory);
router.get("/sources", auth, getCoinSources);
module.exports = router;