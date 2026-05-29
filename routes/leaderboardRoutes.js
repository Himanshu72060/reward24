const express =
    require("express");

const router =
    express.Router();

const {

    createLeaderboard,

    getLeaderboards,

    getLeaderboardByCategory,

    getSingleLeaderboard,

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

// GET CATEGORY WISE

router.get(
    "/category/:categoryId",
    getLeaderboardByCategory
);

// GET SINGLE

router.get(
    "/:id",
    getSingleLeaderboard
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