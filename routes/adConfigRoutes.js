const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {

    createAdConfig,

    getAdConfig,

    updateAdConfig,

    deleteAdConfig

} = require("../controllers/adConfigController");


// ======================
// ADMIN CREATE AD CONFIG
// ======================

router.post(
    "/",
    auth,
    role("admin"),
    createAdConfig
);


// ======================
// USER GET AD CONFIG
// ======================

router.get(
    "/",
    getAdConfig
);


// ======================
// ADMIN UPDATE AD CONFIG
// ======================

router.put(
    "/",
    auth,
    role("admin"),
    updateAdConfig
);


// ======================
// ADMIN DELETE AD CONFIG
// ======================

router.delete(
    "/:id",
    auth,
    role("admin"),
    deleteAdConfig
);


module.exports = router;