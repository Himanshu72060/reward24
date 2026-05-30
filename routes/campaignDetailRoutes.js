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

    createCampaign,

    getCampaigns,

    getCampaign,

    updateCampaign,

    deleteCampaign

} = require(
    "../controllers/campaignDetailController"
);

router.post(

    "/",

    upload.fields([

        {
            name: "image",
            maxCount: 1
        },

        {
            name: "video",
            maxCount: 1
        }

    ]),

    createCampaign

);

router.get(
    "/",
    getCampaigns
);

router.get(
    "/:id",
    getCampaign
);

router.put(
    "/:id",
    updateCampaign
);

router.delete(
    "/:id",
    deleteCampaign
);

module.exports =
    router;