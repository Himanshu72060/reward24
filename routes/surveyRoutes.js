const express = require("express");

const router = express.Router();

const {
    createSurvey,
    getSurveys,
    getSingleSurvey,
    updateSurvey,
    deleteSurvey
} = require("../controllers/surveyController");

router.post("/", createSurvey);

router.get("/", getSurveys);

router.get("/:id", getSingleSurvey);

router.put("/:id", updateSurvey);

router.delete("/:id", deleteSurvey);

module.exports = router;