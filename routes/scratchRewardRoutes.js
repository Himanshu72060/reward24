const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

    // ADMIN
    createScratchReward,
    getScratchRewards,
    getSingleScratchReward,
    updateScratchReward,
    deleteScratchReward,

    // USER
    getUserScratchRewards,
    claimScratchReward,
    getMyScratchHistory

} = require("../controllers/scratchRewardController");


// =======================================
// ADMIN ROUTES
// =======================================

// Create Scratch Reward
router.post(
    "/admin",
    admin,
    createScratchReward
);

// Get All Scratch Rewards
router.get(
    "/admin",
    admin,
    getScratchRewards
);

// Get Single Scratch Reward
router.get(
    "/admin/:id",
    admin,
    getSingleScratchReward
);

// Update Scratch Reward
router.put(
    "/admin/:id",
    admin,
    updateScratchReward
);

// Delete Scratch Reward
router.delete(
    "/admin/:id",
    admin,
    deleteScratchReward
);


// =======================================
// USER ROUTES
// =======================================

// Get Active Scratch Rewards
router.get(
    "/",
    auth,
    getUserScratchRewards
);

// Claim Scratch Reward
router.post(
    "/claim/:id",
    auth,
    claimScratchReward
);

// My Scratch History
router.get(
    "/history",
    auth,
    getMyScratchHistory
);

module.exports = router;