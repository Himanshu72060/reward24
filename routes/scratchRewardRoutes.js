const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

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
    auth,
    createScratchReward
);

// GET ALL

router.get(
    "/",
    auth,
    getScratchRewards
);

// GET SINGLE

router.get(
    "/:id",
    auth,
    getSingleScratchReward
);

// UPDATE

router.put(
    "/:id",
    auth,
    updateScratchReward
);

// DELETE

router.delete(
    "/:id",
    auth,
    deleteScratchReward
);

module.exports =
    router;