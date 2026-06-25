 

// routes/reelRoutes.js

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // ✅ APNA WALA MULTER

const {
    createReel,
    getReels,
    deleteReel,
    likeReel,
    shareReel,
    watchReward,
} = require("../controllers/reelController");


// ================= CREATE REEL =================

router.post(
    "/",
    auth,
    upload.single("video"),  // ✅ memory storage use hoga
    createReel
);


// ================= GET ALL REELS =================

router.get(
    "/",
    auth,
    getReels
);


// ================= LIKE REEL =================

router.put(
    "/like/:id",
    auth,
    likeReel
);


// ================= SHARE REEL =================

router.put(
    "/share/:id",
    auth,
    shareReel
);


// ================= WATCH REWARD =================

router.post(
    "/watch-reward",
    auth,
    watchReward
);


// ================= DELETE REEL =================

router.delete(
    "/:id",
    auth,
    deleteReel
);


module.exports = router;
