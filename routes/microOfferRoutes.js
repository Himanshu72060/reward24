const express =
    require("express");

const router =
    express.Router();

const {

    createMicroOffer,

    getMicroOffers,

    getSingleMicroOffer,

    updateMicroOffer,

    deleteMicroOffer

} = require(
    "../controllers/microOfferController"
);

router.post(
    "/",
    createMicroOffer
);

router.get(
    "/",
    getMicroOffers
);

router.get(
    "/:id",
    getSingleMicroOffer
);

router.put(
    "/:id",
    updateMicroOffer
);

router.delete(
    "/:id",
    deleteMicroOffer
);

module.exports = router;