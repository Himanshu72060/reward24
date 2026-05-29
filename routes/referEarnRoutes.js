const express =
    require("express");

const router =
    express.Router();

const {

    createReferEarn,

    getReferEarns,

    getSingleReferEarn,

    updateReferEarn,

    deleteReferEarn

} = require(
    "../controllers/referEarnController"
);

// CREATE

router.post(
    "/",
    createReferEarn
);

// GET ALL

router.get(
    "/",
    getReferEarns
);

// GET SINGLE

router.get(
    "/:id",
    getSingleReferEarn
);

// UPDATE

router.put(
    "/:id",
    updateReferEarn
);

// DELETE

router.delete(
    "/:id",
    deleteReferEarn
);

module.exports =
    router;