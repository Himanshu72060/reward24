// const express =
//     require("express");

// const router =
//     express.Router();

// const {

//     createPartner,

//     getPartners,

//     updatePartner,

//     deletePartner

// } = require(
//     "../controllers/taskPartnerController"
// );

// router.post(
//     "/",
//     createPartner
// );

// router.get(
//     "/",
//     getPartners
// );

// router.put("/:id", updatePartner);

// router.delete("/:id", deletePartner);

// module.exports =
//     router;

const express = require("express");

const router = express.Router();

const multer = require("multer");

const auth = require("../middleware/authMiddleware");

const role = require("../middleware/roleMiddleware");

const {

    createPartner,

    getPartners,

    getPartnerById,

    updatePartner,

    deletePartner

} = require("../controllers/taskPartnerController");


// ==========================
// MULTER
// ==========================

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});


// ==========================
// CREATE PARTNER (ADMIN)
// ==========================

router.post(

    "/",

    auth,

    role("admin"),

    upload.single("logo"),

    createPartner

);


// ==========================
// GET ALL PARTNERS
// ==========================

router.get(

    "/",

    auth,

    getPartners

);


// ==========================
// GET SINGLE PARTNER
// ==========================

router.get(

    "/:id",

    auth,

    getPartnerById

);


// ==========================
// UPDATE PARTNER (ADMIN)
// ==========================

router.put(

    "/:id",

    auth,

    role("admin"),

    upload.single("logo"),

    updatePartner

);


// ==========================
// DELETE PARTNER (ADMIN)
// ==========================

router.delete(

    "/:id",

    auth,

    role("admin"),

    deletePartner

);

module.exports = router;