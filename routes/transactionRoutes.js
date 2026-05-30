const express =
    require("express");

const router =
    express.Router();

const {

    createTransaction,

    getTransactions,

    getTransactionsByType,

    updateTransaction,

    deleteTransaction

} = require(
    "../controllers/transactionController"
);

router.post(
    "/",
    createTransaction
);

router.get(
    "/",
    getTransactions
);

router.get(
    "/type/:type",
    getTransactionsByType
);

router.put(
    "/:id",
    updateTransaction
);

router.delete(
    "/:id",
    deleteTransaction
);

module.exports =
    router;