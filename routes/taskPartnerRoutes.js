const express =
    require("express");

const router =
    express.Router();

const {

    createPartner,

    getPartners

} = require(
    "../controllers/taskPartnerController"
);

router.post(
    "/",
    createPartner
);

router.get(
    "/",
    getPartners
);

module.exports =
    router;