const express =
    require("express");

const router =
    express.Router();

const {

    createUserProfile,

    getUserProfiles,

    getSingleUserProfile,

    updateUserProfile,

    deleteUserProfile

} = require(
    "../controllers/userProfileController"
);

// CREATE

router.post(
    "/",
    createUserProfile
);

// GET ALL

router.get(
    "/",
    getUserProfiles
);

// GET SINGLE

router.get(
    "/:id",
    getSingleUserProfile
);

// UPDATE

router.put(
    "/:id",
    updateUserProfile
);

// DELETE

router.delete(
    "/:id",
    deleteUserProfile
);

module.exports =
    router;