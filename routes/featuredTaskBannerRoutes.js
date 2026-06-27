const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

const {

    createBanner,

    getBanners,

    getBanner,

    updateBanner,

    deleteBanner

} = require("../controllers/featuredTaskBannerController");


// CREATE
router.post(

    "/",

    upload.single("backgroundImage"),

    createBanner

);


// GET ALL
router.get(
    "/",
    getBanners
);


// GET SINGLE
router.get(
    "/:id",
    getBanner
);


// UPDATE
router.put(

    "/:id",

    upload.single("backgroundImage"),

    updateBanner

);


// DELETE
router.delete(
    "/:id",
    deleteBanner
);

module.exports = router;