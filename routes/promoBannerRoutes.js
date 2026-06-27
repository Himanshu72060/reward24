const express = require("express");

const router = express.Router();

const multer = require("multer");

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {

    createBanner,

    getBanners,

    getBanner,

    updateBanner,

    deleteBanner

} = require("../controllers/promoBannerController");


// ==========================
// MULTER
// ==========================

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});


// ==========================
// CREATE BANNER (ADMIN)
// ==========================

router.post(

    "/",

    auth,

    role("admin"),

    upload.fields([

        {
            name: "backgroundImage",
            maxCount: 1
        },

        {
            name: "foregroundImage",
            maxCount: 1
        }

    ]),

    createBanner

);


// ==========================
// GET ALL BANNERS
// ==========================

router.get(

    "/",

    auth,

    getBanners

);


// ==========================
// GET SINGLE BANNER
// ==========================

router.get(

    "/:id",

    auth,

    getBanner

);


// ==========================
// UPDATE BANNER (ADMIN)
// ==========================

router.put(

    "/:id",

    auth,

    role("admin"),

    upload.fields([

        {
            name: "backgroundImage",
            maxCount: 1
        },

        {
            name: "foregroundImage",
            maxCount: 1
        }

    ]),

    updateBanner

);


// ==========================
// DELETE BANNER (ADMIN)
// ==========================

router.delete(

    "/:id",

    auth,

    role("admin"),

    deleteBanner

);

module.exports = router;