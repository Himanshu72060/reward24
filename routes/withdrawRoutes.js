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

    

} =
    require("../controllers/withdrawController");


router.post(
    "/upi",
    auth,
    createUpiWithdraw
);

router.post(
    "/bank",
    auth,
    createBankWithdraw
);

router.get(
    "/terms/:type",
    getTerms
);

router.get(
    "/my-upi-withdraws",
    auth,
    getMyUpiWithdraws
);

router.get(
    "/my-bank-withdraws",
    auth,
    getMyBankWithdraws
);

module.exports =
    router;