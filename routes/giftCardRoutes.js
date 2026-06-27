const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {

    createGiftCard,

    getGiftCards,

    getGiftCard,

    updateGiftCard,

    deleteGiftCard,

    redeemGiftCard

} = require("../controllers/giftCardController");


// ================= ADMIN =================

// Create Gift Card
router.post(
    "/",
    auth,
    role("admin"),
    createGiftCard
);

// Update Gift Card
router.put(
    "/:id",
    auth,
    role("admin"),
    updateGiftCard
);

// Delete Gift Card
router.delete(
    "/:id",
    auth,
    role("admin"),
    deleteGiftCard
);


// ================= USER =================

// Get All Gift Cards
router.get(
    "/",
    auth,
    getGiftCards
);

// Get Single Gift Card
router.get(
    "/:id",
    auth,
    getGiftCard
);

// Redeem Gift Card
router.post(
    "/redeem/:id",
    auth,
    redeemGiftCard
);

module.exports = router;