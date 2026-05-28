const express =
    require("express");

const router =
    express.Router();

const {

    createStoreCategory,

    getStoreCategories,

    getSingleStoreCategory,

    updateStoreCategory,

    deleteStoreCategory

} = require(
    "../controllers/storeCategoryController"
);

// CREATE

router.post(
    "/",
    createStoreCategory
);

// GET ALL

router.get(
    "/",
    getStoreCategories
);

// GET SINGLE

router.get(
    "/:id",
    getSingleStoreCategory
);

// UPDATE

router.put(
    "/:id",
    updateStoreCategory
);

// DELETE

router.delete(
    "/:id",
    deleteStoreCategory
);

module.exports =
    router;