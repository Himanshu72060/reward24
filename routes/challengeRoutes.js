const express =
    require("express");

const router =
    express.Router();

const {

    createChallenge,

    getChallenges,

    getSingleChallenge,

    updateChallenge,

    deleteChallenge

} = require(
    "../controllers/challengeController"
);

// CREATE

router.post(
    "/",
    createChallenge
);

// GET ALL

router.get(
    "/",
    getChallenges
);

// GET SINGLE

router.get(
    "/:id",
    getSingleChallenge
);

// UPDATE

router.put(
    "/:id",
    updateChallenge
);

// DELETE

router.delete(
    "/:id",
    deleteChallenge
);

module.exports =
    router;