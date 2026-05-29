const express =
    require("express");

const router =
    express.Router();

const {

    createSupport,

    getSupports,

    getSingleSupport,

    updateSupport,

    deleteSupport

} = require(
    "../controllers/supportController"
);

// CREATE

router.post(
    "/",
    createSupport
);

// GET ALL

router.get(
    "/",
    getSupports
);

// GET SINGLE

router.get(
    "/:id",
    getSingleSupport
);

// UPDATE

router.put(
    "/:id",
    updateSupport
);

// DELETE

router.delete(
    "/:id",
    deleteSupport
);

module.exports =
    router;