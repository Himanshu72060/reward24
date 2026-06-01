const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {

    createTransaction,

    getTransactions,

    getTransactionsByType,

    updateTransaction,

    deleteTransaction

} = require(
    "../controllers/transactionController"
);


// CREATE

router.post(
    "/",
    authMiddleware,
    createTransaction
);


// GET ALL

router.get(
    "/",
    authMiddleware,
    getTransactions
);


// GET BY TYPE

router.get(
    "/type/:type",
    authMiddleware,
    getTransactionsByType
);


// UPDATE

router.put(
    "/:id",
    authMiddleware,
    updateTransaction
);


// DELETE

router.delete(
    "/:id",
    authMiddleware,
    deleteTransaction
);

module.exports =
    router;