const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
    createReel,
    getReels,
    getSingleReel,
    getMyUploadedReels,
    deleteReel,
    likeReel,
    shareReel,
    watchReward,
} = require("../controllers/reelController");

// ADMIN
router.post("/", adminAuth, upload.single("video"), createReel);

router.get("/my-reels", adminAuth, getMyUploadedReels);

router.delete("/:id", adminAuth, deleteReel);

// USER
router.get("/", auth, getReels);

router.get("/:id", auth, getSingleReel);

router.put("/like/:id", auth, likeReel);

router.put("/share/:id", auth, shareReel);

router.post("/watch-reward", auth, watchReward);

module.exports = router;