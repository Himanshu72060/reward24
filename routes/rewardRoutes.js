const express =
    require("express");

const router =
    express.Router();

const {

    createReward,

    getRewards,

    getSingleReward,

    updateReward,

    deleteReward

} = require(
    "../controllers/rewardController"
);

// CREATE

router.post(
    "/",
    createReward
);

// GET ALL

router.get(
    "/",
    getRewards
);

// GET SINGLE

router.get(
    "/:id",
    getSingleReward
);

// UPDATE

router.put(
    "/:id",
    updateReward
);

// DELETE

router.delete(
    "/:id",
    deleteReward
);

module.exports =
    router;