const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
    saveWalletConfig,
    getWalletConfig,
        getTransactions,
        updateTransaction,
        deleteTransaction
} = require("../controllers/walletController");

// 🔐 ADMIN ONLY
router.post("/config", auth, saveWalletConfig);

// 🌐 PUBLIC
router.get("/config", getWalletConfig);

// 📋 USER ONLY
router.get("/transactions", auth, getTransactions);
router.put("/transactions/:id", auth, updateTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);

module.exports = router;