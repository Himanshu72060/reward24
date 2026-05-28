const express =
    require("express");

const multer =
    require("multer");

const router =
    express.Router();

const {

    createStore,

    getStores,

    getSingleStore,

    updateStore,

    deleteStore

} = require(
    "../controllers/storeController"
);

// MULTER

const upload =
    multer({
        dest: "uploads/"
    });

// CREATE

router.post(
    "/",
    upload.single("image"),
    createStore
);

// GET ALL

router.get(
    "/",
    getStores
);

// GET SINGLE

router.get(
    "/:id",
    getSingleStore
);

// UPDATE

router.put(
    "/:id",
    updateStore
);

// DELETE

router.delete(
    "/:id",
    deleteStore
);

module.exports =
    router;