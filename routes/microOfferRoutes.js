const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {

    // ADMIN
    createMicroOffer,
    getMicroOffers,
    getSingleMicroOffer,
    updateMicroOffer,
    deleteMicroOffer,

    // USER
    getUserMicroOffers,
    completeMicroOffer,
    getMyMicroOfferHistory

} = require("../controllers/microOfferController");


// =====================================
// ADMIN ROUTES
// =====================================

// CREATE
router.post(

    "/admin",

    admin,

    createMicroOffer

);

// GET ALL
router.get(

    "/admin",

    admin,

    getMicroOffers

);

// GET SINGLE
router.get(

    "/admin/:id",

    admin,

    getSingleMicroOffer

);

// UPDATE
router.put(

    "/admin/:id",

    admin,

    updateMicroOffer

);

// DELETE
router.delete(

    "/admin/:id",

    admin,

    deleteMicroOffer

);


// =====================================
// USER ROUTES
// =====================================

// GET ACTIVE OFFERS
router.get(

    "/",

    auth,

    getUserMicroOffers

);

// COMPLETE OFFER
router.post(

    "/complete/:id",

    auth,

    completeMicroOffer

);

// MY HISTORY
router.get(

    "/history",

    auth,

    getMyMicroOfferHistory

);

module.exports = router;