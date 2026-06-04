const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createUpiWithdraw,
    createBankWithdraw,

    getTerms,

    getMyUpiWithdraws,
    getMyBankWithdraws,

    getAllUpiWithdraws,
    getAllBankWithdraws,

    approveUpiWithdraw,
    rejectUpiWithdraw,

    approveBankWithdraw,
    rejectBankWithdraw,

    createTerm,
    updateTerm,
    deleteTerm

} = require(
    "../controllers/withdrawController"
);


// ==============================
// USER ROUTES
// ==============================

// UPI Withdraw
router.post(
    "/upi",
    auth,
    createUpiWithdraw
);

// Bank Withdraw
router.post(
    "/bank",
    auth,
    createBankWithdraw
);

// My UPI Withdraws
router.get(
    "/my-upi",
    auth,
    getMyUpiWithdraws
);

// My Bank Withdraws
router.get(
    "/my-bank",
    auth,
    getMyBankWithdraws
);

// Terms & Conditions
router.get(
    "/terms/:type",
    auth,
    getTerms
);


// ==============================
// ADMIN ROUTES
// ==============================

// All UPI Withdraws
router.get(
    "/admin/upi",
    auth,
    getAllUpiWithdraws
);

// All Bank Withdraws
router.get(
    "/admin/bank",
    auth,
    getAllBankWithdraws
);

// Approve UPI
router.put(
    "/upi/approve/:id",
    auth,
    approveUpiWithdraw
);

// Reject UPI
router.put(
    "/upi/reject/:id",
    auth,
    rejectUpiWithdraw
);

// Approve Bank
router.put(
    "/bank/approve/:id",
    auth,
    approveBankWithdraw
);

// Reject Bank
router.put(
    "/bank/reject/:id",
    auth,
    rejectBankWithdraw
);


// ==============================
// TERMS CRUD
// ==============================

// Create Term
router.post(
    "/term",
    auth,
    createTerm
);

// Update Term
router.put(
    "/term/:id",
    auth,
    updateTerm
);

// Delete Term
router.delete(
    "/term/:id",
    auth,
    deleteTerm
);

module.exports =
    router;