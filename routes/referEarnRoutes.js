const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

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
    auth,
    createReferEarn
);

// GET ALL

router.get(
    "/",
    auth,
    getReferEarns
);

// GET SINGLE

router.get(
    "/:id",
    auth,
    getSingleReferEarn
);

// UPDATE

router.put(
    "/:id",
    auth,
    updateReferEarn
);

// DELETE

router.delete(
    "/:id",
    auth,
    deleteReferEarn
);

module.exports =
    router;