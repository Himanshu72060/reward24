const express =
    require("express");

const router =
    express.Router();

const {

    createEarning,

    getEarnings,

    getSingleEarning,

    updateEarning,

    deleteEarning

} = require(
    "../controllers/earningController"
);

// CREATE

router.post(
    "/",
    createEarning
);

// GET ALL

router.get(
    "/",
    getEarnings
);

// GET SINGLE

router.get(
    "/:id",
    getSingleEarning
);

// UPDATE

router.put(
    "/:id",
    updateEarning
);

// DELETE

router.delete(
    "/:id",
    deleteEarning
);

module.exports = router;