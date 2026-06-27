// // const express = require("express");
// // const router = express.Router();

// // const auth = require("../middleware/authMiddleware");

// // const {
// //     saveWalletConfig,
// //     getWalletConfig,
// //     getTransactions,
// //     updateTransaction,
// //     deleteTransaction,
// //     getTransactionsByType

// // } = require("../controllers/walletController");

// // // 🔐 ADMIN ONLY
// // router.post("/config", auth, saveWalletConfig);

// // // 🌐 PUBLIC
// // router.get("/config", getWalletConfig);

// // // 📋 GET ALL TRANSACTIONS
// // router.get("/transactions", auth, getTransactions);

// // // 📊 GET TRANSACTIONS BY TYPE (withdraw/deposit/etc)
// // router.get("/transactions/type/:type", auth, getTransactionsByType);

// // // ✏️ UPDATE TRANSACTION
// // router.put("/transactions/:id", auth, updateTransaction);

// // // ❌ DELETE TRANSACTION
// // router.delete("/transactions/:id", auth, deleteTransaction);

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const auth = require("../middleware/authMiddleware");

// const {
//     getWallet
// } = require("../controllers/walletController");


// router.get(
//     "/",
//     auth,
//     getWallet
// );


// module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getWallet,
    getCoinHistory
} = require("../controllers/walletController");

router.get("/", auth, getWallet);

router.get("/history", auth, getCoinHistory);

module.exports = router;