const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {

    signup,

    login,

    profile,

    referralHistory,

    getUsers,

    updateUser,

    deleteUser,

    editProfile,
    getMyReferral

} = require(
    "../controllers/authController"
);



// ROUTES
router.post(
    "/signup",
    signup
);

router.post(
    "/login",
    login
);

router.get(
    "/profile",
    authMiddleware,
    profile
);

// GET ALL USERS
router.get("/users", getUsers);

// UPDATE USER
router.put("/users/:id", updateUser);

// DELETE USER
router.delete("/users/:id", deleteUser);

router.get(
    "/referral-history",
    authMiddleware,
    referralHistory
);

router.put(
    "/edit-profile",
    authMiddleware,
    editProfile
);
router.get(
    "/my-referral",
    authMiddleware,
    getMyReferral
);
module.exports =
    router;