const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {

    // ADMIN

    createSurvey,
    getSurveys,
    getSingleSurvey,
    updateSurvey,
    deleteSurvey,

    // USER

    getUserSurveys,
    completeSurvey,
    getMySurveyHistory

} = require("../controllers/surveyController");


// ===========================================
// ADMIN ROUTES
// ===========================================

// CREATE SURVEY

router.post(

    "/admin",

    admin,

    upload.array("images"),

    createSurvey

);


// GET ALL SURVEYS

router.get(

    "/admin",

    admin,

    getSurveys

);


// GET SINGLE SURVEY

router.get(

    "/admin/:id",

    admin,

    getSingleSurvey

);


// UPDATE SURVEY

router.put(

    "/admin/:id",

    admin,

    upload.array("images"),

    updateSurvey

);


// DELETE SURVEY

router.delete(

    "/admin/:id",

    admin,

    deleteSurvey

);


// ===========================================
// USER ROUTES
// ===========================================

// GET ACTIVE SURVEYS

router.get(

    "/",

    auth,

    getUserSurveys

);


// COMPLETE SURVEY

router.post(

    "/complete/:id",

    auth,

    completeSurvey

);


// MY SURVEY HISTORY

router.get(

    "/history",

    auth,

    getMySurveyHistory

);

module.exports = router;