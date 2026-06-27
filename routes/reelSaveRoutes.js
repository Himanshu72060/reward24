const express = require("express");

const router = express.Router();


const auth = require("../middleware/authMiddleware");


const {

    saveReel,

    removeSave,

    getSavedReels

} = require("../controllers/reelSaveController");





// ==========================
// SAVE REEL
// ==========================

router.post(

    "/",

    auth,

    saveReel

);





// ==========================
// REMOVE SAVED REEL
// ==========================

router.post(

    "/remove",

    auth,

    removeSave

);





// ==========================
// GET SAVED REELS
// ==========================

router.get(

    "/",

    auth,

    getSavedReels

);



module.exports = router;