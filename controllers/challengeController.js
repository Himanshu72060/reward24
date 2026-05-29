const Challenge =
    require("../models/Challenge");

// ================= CREATE =================

exports.createChallenge =
    async (req, res) => {

        try {

            const challenge =
                await Challenge.create(
                    req.body
                );

            res.status(201)
                .json({
                    success: true,
                    data: challenge
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// ================= GET ALL =================

exports.getChallenges =
    async (req, res) => {

        try {

            const challenges =
                await Challenge.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200)
                .json({
                    success: true,
                    data: challenges
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// ================= GET SINGLE =================

exports.getSingleChallenge =
    async (req, res) => {

        try {

            const challenge =
                await Challenge.findById(
                    req.params.id
                );

            res.status(200)
                .json({
                    success: true,
                    data: challenge
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// ================= UPDATE =================

exports.updateChallenge =
    async (req, res) => {

        try {

            const challenge =
                await Challenge.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200)
                .json({
                    success: true,
                    data: challenge
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// ================= DELETE =================

exports.deleteChallenge =
    async (req, res) => {

        try {

            await Challenge.findByIdAndDelete(
                req.params.id
            );

            res.status(200)
                .json({
                    success: true,
                    message:
                        "Challenge Deleted"
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };