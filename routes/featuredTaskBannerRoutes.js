const express =
    require("express");

const router =
    express.Router();

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