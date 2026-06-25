

// routes/reelRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
    createReel,
    getReels,
    deleteReel,
    likeReel,
    shareReel,
    watchReward,
} = require("../controllers/reelController");


// ================= CREATE REEL (ADMIN ONLY) =================

router.post(
    "/",
    adminAuth,
    upload.single("video"),
    createReel
);


// ================= GET ALL REELS (USER) =================

router.get("/", auth, getReels);


// ================= LIKE REEL (USER) =================

router.put("/like/:id", auth, likeReel);


// ================= SHARE REEL (USER) =================

router.put("/share/:id", auth, shareReel);


// ================= WATCH REWARD (USER) =================

router.post("/watch-reward", auth, watchReward);


// ================= DELETE REEL (ADMIN ONLY) =================

router.delete("/:id", adminAuth, deleteReel);


module.exports = router;