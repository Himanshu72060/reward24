const express =
    require("express");

const router =
    express.Router();

const {

    createPartner,

    getPartners,

    updatePartner,

    deletePartner

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

router.put("/:id", updatePartner);

router.delete("/:id", deletePartner);

module.exports =
    router;