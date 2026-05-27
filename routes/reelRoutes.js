const express =
    require("express");

const multer =
    require("multer");

const router =
    express.Router();

const {

    createReel,

    getReels,

    deleteReel

} = require(
    "../controllers/reelController"
);

// MULTER

const upload =
    multer({
        dest: "uploads/"
    });

// CREATE

router.post(
    "/",
    upload.single("video"),
    createReel
);

// GET

router.get(
    "/",
    getReels
);

// DELETE

router.delete(
    "/:id",
    deleteReel
);

module.exports =
    router;