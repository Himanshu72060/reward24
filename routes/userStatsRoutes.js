const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createStats,

    getStats,

    updateStats,

    deleteStats

} = require(
    "../controllers/userStatsController"
);


// CREATE

router.post(
    "/",
    auth,
    createStats
);


// GET

router.get(
    "/",
    auth,
    getStats
);


// UPDATE

router.put(
    "/:id",
    auth,
    updateStats
);


// DELETE

router.delete(
    "/:id",
    auth,
    deleteStats
);

module.exports =
    router;