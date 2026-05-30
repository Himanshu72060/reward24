const express =
    require("express");

const router =
    express.Router();

const {

    createNetwork,

    getNetwork,

    updateNetwork,

    deleteNetwork

} = require(
    "../controllers/networkController"
);

router.post(
    "/",
    createNetwork
);

router.get(
    "/",
    getNetwork
);

router.put(
    "/:id",
    updateNetwork
);

router.delete(
    "/:id",
    deleteNetwork
);

module.exports =
    router;