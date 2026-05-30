const express =
    require("express");

const router =
    express.Router();

const {

    createStats,

    getStats,

    updateStats,

    deleteStats

} = require(
    "../controllers/userStatsController"
);

router.post(
    "/",
    createStats
);

router.get(
    "/",
    getStats
);

router.put(
    "/:id",
    updateStats
);

router.delete(
    "/:id",
    deleteStats
);

module.exports =
    router;