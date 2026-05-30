const express =
    require("express");

const router =
    express.Router();

const {

    createPartnerDetail,

    getPartnerDetail

} = require(
    "../controllers/partnerDetailController"
);

router.post(
    "/",
    createPartnerDetail
);

router.get(
    "/:partnerId",
    getPartnerDetail
);

module.exports =
    router;