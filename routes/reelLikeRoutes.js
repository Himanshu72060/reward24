const express = require("express");

const router = express.Router();


const auth = require("../middleware/authMiddleware");


const {

    likeReel,

    unlikeReel,

    getReelLikes

} = require("../controllers/reelLikeController");





// ==========================
// LIKE REEL
// ==========================

router.post(

    "/",

    auth,

    likeReel

);





// ==========================
// UNLIKE REEL
// ==========================

router.post(

    "/unlike",

    auth,

    unlikeReel

);





// ==========================
// GET REEL LIKES
// ==========================

router.get(

    "/:reelId",

    auth,

    getReelLikes

);



module.exports = router;