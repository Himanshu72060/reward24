const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

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
    auth,
    createUserProfile
);

// GET ALL

router.get(
    "/",
    auth,
    getUserProfiles
);

// GET SINGLE

router.get(
    "/:id",
    auth,
    getSingleUserProfile
);

// UPDATE

router.put(
    "/:id",
    auth,
    updateUserProfile
);

// DELETE

router.delete(
    "/:id",
    auth,
    deleteUserProfile
);

module.exports =
    router;