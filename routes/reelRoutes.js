const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {

    // ADMIN

    createReel,

    getAllReels,

    getSingleReel,

    updateReel,

    deleteReel,

    // USER

    getUserReels,

    completeReel,

    getMyReelHistory

} = require("../controllers/reelController");


// ==========================================
// ADMIN ROUTES
// ==========================================

// CREATE REEL

router.post(

    "/admin",

    admin,

    upload.fields([

        {

            name: "video",

            maxCount: 1

        },

        {

            name: "image",

            maxCount: 1

        }

    ]),

    createReel

);


// GET ALL

router.get(

    "/admin",

    admin,

    getAllReels

);


// GET SINGLE

router.get(

    "/admin/:id",

    admin,

    getSingleReel

);


// UPDATE

router.put(

    "/admin/:id",

    admin,

    upload.fields([

        {

            name: "video",

            maxCount: 1

        },

        {

            name: "image",

            maxCount: 1

        }

    ]),

    updateReel

);


// DELETE

router.delete(

    "/admin/:id",

    admin,

    deleteReel

);



// ==========================================
// USER ROUTES
// ==========================================


// GET ACTIVE REELS

router.get(

    "/",

    auth,

    getUserReels

);


// COMPLETE REEL

router.post(

    "/complete/:id",

    auth,

    completeReel

);


// REEL HISTORY

router.get(

    "/history",

    auth,

    getMyReelHistory

);

module.exports = router;