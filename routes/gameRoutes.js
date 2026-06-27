const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const upload = require("../middleware/upload");

const {

    // ADMIN

    createGame,

    getGames,

    getSingleGame,

    updateGame,

    deleteGame,

    // USER

    getUserGames,

    completeGame,

    getMyGameHistory

} = require("../controllers/gameController");


// =======================================
// ADMIN ROUTES
// =======================================

// CREATE GAME

router.post(

    "/admin",

    admin,

    upload.single("image"),

    createGame

);

// GET ALL GAMES

router.get(

    "/admin",

    admin,

    getGames

);

// GET SINGLE GAME

router.get(

    "/admin/:id",

    admin,

    getSingleGame

);

// UPDATE GAME

router.put(

    "/admin/:id",

    admin,

    upload.single("image"),

    updateGame

);

// DELETE GAME

router.delete(

    "/admin/:id",

    admin,

    deleteGame

);


// =======================================
// USER ROUTES
// =======================================

// GET ACTIVE GAMES

router.get(

    "/",

    auth,

    getUserGames

);

// COMPLETE GAME STEP

router.post(

    "/complete/:id",

    auth,

    completeGame

);

// MY GAME HISTORY

router.get(

    "/history",

    auth,

    getMyGameHistory

);

module.exports = router;