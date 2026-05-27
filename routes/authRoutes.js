const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {

    signup,

    login,

    profile,

    referralHistory

} = require(
    "../controllers/authController"
);



// ROUTES
router.post(
    "/signup",
    signup
);

router.post(
    "/login",
    login
);

router.get(
    "/profile",
    authMiddleware,
    profile
);

router.get(
    "/referral-history",
    authMiddleware,
    referralHistory
);

module.exports =
    router;