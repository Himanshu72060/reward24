const express =
    require("express");

const multer =
    require("multer");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createReel,

    getReels,

    deleteReel,

    likeReel,

    shareReel,

    watchReward

} = require(
    "../controllers/reelController"
);

const upload =
    multer({
        dest: "uploads/"
    });


// CREATE

router.post(
    "/",
    auth,
    upload.single("video"),
    createReel
);


// GET ALL

router.get(
    "/",
    auth,
    getReels
);


// LIKE

router.put(
    "/like/:id",
    auth,
    likeReel
);


// SHARE

router.put(
    "/share/:id",
    auth,
    shareReel
);


// WATCH REWARD

router.post(
    "/watch-reward",
    auth,
    watchReward
);


// DELETE

router.delete(
    "/:id",
    auth,
    deleteReel
);

module.exports =
    router;