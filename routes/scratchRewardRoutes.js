const express =
    require("express");

const router =
    express.Router();

const {

    createScratchReward,

    getScratchRewards,

    getSingleScratchReward,

    updateScratchReward,

    deleteScratchReward

} = require(
    "../controllers/scratchRewardController"
);

// CREATE

router.post(
    "/",
    createScratchReward
);

// GET ALL

router.get(
    "/",
    getScratchRewards
);

// GET SINGLE

router.get(
    "/:id",
    getSingleScratchReward
);

// UPDATE

router.put(
    "/:id",
    updateScratchReward
);

// DELETE

router.delete(
    "/:id",
    deleteScratchReward
);

module.exports =
    router;