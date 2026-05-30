const express =
    require("express");

const multer =
    require("multer");

const router =
    express.Router();

const upload =
    multer({
        dest: "uploads/"
    });

const {

    createBanner,

    getBanners,

    getBanner,

    updateBanner,

    deleteBanner

} = require(
    "../controllers/featuredTaskBannerController"
);

router.post(

    "/",

    upload.fields([

        {
            name:
                "backgroundImage",
            maxCount: 1
        },

        {
            name:
                "taskImage",
            maxCount: 1
        }

    ]),

    createBanner

);

router.get(
    "/",
    getBanners
);

router.get(
    "/:id",
    getBanner
);

router.put(
    "/:id",
    updateBanner
);

router.delete(
    "/:id",
    deleteBanner
);

module.exports =
    router;