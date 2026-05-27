const express =
    require("express");

const router =
    express.Router();

const {

    createGame,

    getGames,

    getSingleGame,

    updateGame,

    deleteGame

} = require(
    "../controllers/gameController"
);

router.post(
    "/",
    createGame
);

router.get(
    "/",
    getGames
);

router.get(
    "/:id",
    getSingleGame
);

router.put(
    "/:id",
    updateGame
);

router.delete(
    "/:id",
    deleteGame
);

module.exports = router;