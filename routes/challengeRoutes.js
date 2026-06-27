const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {

    // ADMIN
    createChallenge,
    getChallenges,
    getSingleChallenge,
    updateChallenge,
    deleteChallenge,

    // USER
    getUserChallenges,
    completeChallenge,
    getMyChallengeHistory

} = require("../controllers/challengeController");


// =======================================
// ADMIN ROUTES
// =======================================

// Create Challenge
router.post(
    "/admin",
    admin,
    createChallenge
);

// Get All Challenges
router.get(
    "/admin",
    admin,
    getChallenges
);

// Get Single Challenge
router.get(
    "/admin/:id",
    admin,
    getSingleChallenge
);

// Update Challenge
router.put(
    "/admin/:id",
    admin,
    updateChallenge
);

// Delete Challenge
router.delete(
    "/admin/:id",
    admin,
    deleteChallenge
);


// =======================================
// USER ROUTES
// =======================================

// Get Active Challenges
router.get(
    "/",
    auth,
    getUserChallenges
);

// Complete Challenge
router.post(
    "/complete/:id",
    auth,
    completeChallenge
);

// My Challenge History
router.get(
    "/history",
    auth,
    getMyChallengeHistory
);

module.exports = router;