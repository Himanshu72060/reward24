const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {
    claimDailyStreak,
    getDailyStreakHistory
} = require(
    "../controllers/dailyStreakController"
);

router.post(
    "/claim",
    auth,
    claimDailyStreak
);

router.get(
    "/history",
    auth,
    getDailyStreakHistory
);

module.exports =
    router;