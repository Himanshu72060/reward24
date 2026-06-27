const express = require("express");

const router = express.Router();


const auth = require("../middleware/authMiddleware");


const {

    watchReel,

    getWatchHistory

} = require("../controllers/reelWatchController");





// ==========================
// WATCH REEL
// ==========================

router.post(

    "/",

    auth,

    watchReel

);





// ==========================
// GET WATCH HISTORY
// ==========================

router.get(

    "/history",

    auth,

    getWatchHistory

);



module.exports = router;