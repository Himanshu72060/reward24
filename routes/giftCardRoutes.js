const express =
    require("express");

const router =
    express.Router();

const {

    createGiftCard,

    getGiftCards,

    getGiftCard,

    updateGiftCard,

    deleteGiftCard

} = require(
    "../controllers/giftCardController"
);

router.post(
    "/",
    createGiftCard
);

router.get(
    "/",
    getGiftCards
);

router.get(
    "/:id",
    getGiftCard
);

router.put(
    "/:id",
    updateGiftCard
);

router.delete(
    "/:id",
    deleteGiftCard
);

module.exports =
    router;