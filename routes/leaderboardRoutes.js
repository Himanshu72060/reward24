const express =
    require("express");

const router =
    express.Router();

const {

    createLeaderboard,

    getLeaderboards,

    getLeaderboardByCategory,

    updateLeaderboard,

    deleteLeaderboard

} = require(
    "../controllers/leaderboardController"
);

// CREATE

router.post(
    "/",
    createLeaderboard
);

// GET ALL

router.get(
    "/",
    getLeaderboards
);

// GET BY CATEGORY

router.get(
    "/category/:category",
    getLeaderboardByCategory
);

// UPDATE

router.put(
    "/:id",
    updateLeaderboard
);

// DELETE

router.delete(
    "/:id",
    deleteLeaderboard
);

module.exports =
    router;