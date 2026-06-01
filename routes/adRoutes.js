const express =
    require("express");

const multer =
    require("multer");

const router =
    express.Router();

const auth =
    require(
        "../middleware/authMiddleware"
    );

const upload =
    multer({
        dest: "uploads/"
    });

const {

    createAd,

    getAd,

    getAds,

    updateAd,

    deleteAd

} = require(
    "../controllers/adController"
);


// CREATE

router.post(
    "/",
    auth,
    upload.single("media"),
    createAd
);


// RANDOM AD

router.get(
    "/random",
    auth,
    getAd
);


// GET ALL

router.get(
    "/",
    auth,
    getAds
);


// UPDATE

router.put(
    "/:id",
    auth,
    updateAd
);


// DELETE

router.delete(
    "/:id",
    auth,
    deleteAd
);

module.exports =
    router;