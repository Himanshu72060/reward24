const express =
    require("express");

const router =
    express.Router();

const auth =
    require(
        "../middleware/authMiddleware"
    );

const {

    createAd,

    getAd,

    updateAd,

    deleteAd

} = require(
    "../controllers/adController"
);

router.post(
    "/",
    auth,
    createAd
);

router.get(
    "/",
    auth,
    getAd
);

router.put(
    "/:id",
    auth,
    updateAd
);

router.delete(
    "/:id",
    auth,
    deleteAd
);

module.exports =
    router;