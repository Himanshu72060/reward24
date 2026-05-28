const express =
    require("express");

const router =
    express.Router();

const {

    createLeaderboard,

    getLeaderboards,

    getLeaderboardByType,

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

// GET DAILY / WEEKLY / MONTHLY / ALLTIME

router.get(
    "/type/:type",
    getLeaderboardByType
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