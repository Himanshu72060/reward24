const express = require("express");

const router = express.Router();


const auth = require("../middleware/authMiddleware");


const {

    addCoins,

    getCoinHistory,

    getMyCoins

} = require("../controllers/coinController");





// ==========================
// ADD COINS
// ==========================

router.post(

    "/add",

    auth,

    addCoins

);





// ==========================
// COIN HISTORY
// ==========================

router.get(

    "/history",

    auth,

    getCoinHistory

);





// ==========================
// MY TOTAL COINS
// ==========================

router.get(

    "/my-coins",

    auth,

    getMyCoins

);



module.exports = router;