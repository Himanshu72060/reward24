const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {
    redeemVoucher,
    getMyRedeems
} =
    require("../controllers/redeemController");

router.post(
    "/redeem",
    auth,
    redeemVoucher
);

router.get(
    "/my-redeems",
    auth,
    getMyRedeems
);

module.exports =
    router;