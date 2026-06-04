const express =
    require("express");

const router =
    express.Router();

const {

    createUpi,

    getAllUpi,

    getSingleUpi,

    updateUpi,

    deleteUpi

} =
    require(
        "../controllers/upiController"
    );


// CREATE

router.post(
    "/",
    createUpi
);


// GET ALL

router.get(
    "/",
    getAllUpi
);


// GET SINGLE

router.get(
    "/:id",
    getSingleUpi
);


// UPDATE

router.put(
    "/:id",
    updateUpi
);


// DELETE

router.delete(
    "/:id",
    deleteUpi
);

module.exports =
    router;