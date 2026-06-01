const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    createRedeemOption,

    getRedeemOptions,

    getRedeemOption,

    updateRedeemOption,

    deleteRedeemOption

} = require(
    "../controllers/redeemOptionController"
);


// CREATE

router.post(
    "/",
    auth,
    createRedeemOption
);


// GET ALL

router.get(
    "/",
    auth,
    getRedeemOptions
);


// GET SINGLE

router.get(
    "/:id",
    auth,
    getRedeemOption
);


// UPDATE

router.put(
    "/:id",
    auth,
    updateRedeemOption
);


// DELETE

router.delete(
    "/:id",
    auth,
    deleteRedeemOption
);

module.exports =
    router;