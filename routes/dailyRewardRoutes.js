const express =
    require("express");

const router =
    express.Router();

const {

    createDailyReward,

    getDailyRewards,

    getSingleDailyReward,

    updateDailyReward,

    deleteDailyReward

} = require(
    "../controllers/dailyRewardController"
);

// ================= CREATE =================

router.post(
    "/",
    createDailyReward
);

// ================= GET ALL =================

router.get(
    "/",
    getDailyRewards
);

// ================= GET SINGLE =================

router.get(
    "/:id",
    getSingleDailyReward
);

// ================= UPDATE =================

router.put(
    "/:id",
    updateDailyReward
);

// ================= DELETE =================

router.delete(
    "/:id",
    deleteDailyReward
);

module.exports =
    router;