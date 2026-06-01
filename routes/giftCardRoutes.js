const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createGiftCard,

    getGiftCards,

    getGiftCard,

    updateGiftCard,

    deleteGiftCard

} = require(
    "../controllers/giftCardController"
);


// CREATE

router.post(
    "/",
    auth,
    createGiftCard
);


// GET ALL

router.get(
    "/",
    auth,
    getGiftCards
);


// GET SINGLE

router.get(
    "/:id",
    auth,
    getGiftCard
);


// UPDATE

router.put(
    "/:id",
    auth,
    updateGiftCard
);


// DELETE

router.delete(
    "/:id",
    auth,
    deleteGiftCard
);

module.exports =
    router;