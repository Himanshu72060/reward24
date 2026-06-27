const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

    // Admin
    createDailyStreak,
    getAllDailyStreakConfigs,
    updateDailyStreak,
    deleteDailyStreak,

    // User

    getDailyStreaks,
    claimDailyStreak,
    getDailyStreakHistory

} = require("../controllers/dailyStreakController");


// ======================================
// ADMIN ROUTES
// ======================================

// Create Day
router.post(
    "/admin",
    admin,
    createDailyStreak
);

// Get All Configs
router.get(
    "/admin",
    admin,
    getAllDailyStreakConfigs
);

// Update
router.put(
    "/admin/:id",
    admin,
    updateDailyStreak
);

// Delete
router.delete(
    "/admin/:id",
    admin,
    deleteDailyStreak
);


// ======================================
// USER ROUTES
// ======================================

// Get All Daily Streaks
router.get(
    "/",
    auth,
    getDailyStreaks
);

// Claim
router.post(
    "/claim",
    auth,
    claimDailyStreak
);

// History
router.get(
    "/history",
    auth,
    getDailyStreakHistory
);

module.exports = router;