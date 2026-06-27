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


// ================= MULTER =================

const storage =
    multer.memoryStorage();

const upload =
    multer({

        storage

    });


// CREATE

router.post(

    "/",

    auth,

    role("admin"),

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

    auth,

    role("admin"),

    upload.single("backgroundImage"),

    updateBanner

);


// DELETE

router.delete(

    "/:id",

    auth,

    role("admin"),

    deleteBanner

);

module.exports =
    router;