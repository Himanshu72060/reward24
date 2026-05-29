const DailyReward =
    require("../models/DailyReward");

// ================= CREATE =================

exports.createDailyReward =
    async (req, res) => {

        try {

            const reward =
                await DailyReward.create(
                    req.body
                );

            res.status(201)
                .json({
                    success: true,
                    data: reward
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

exports.getDailyRewards =
    async (req, res) => {

        try {

            const rewards =
                await DailyReward.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200)
                .json({
                    success: true,
                    data: rewards
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

exports.getSingleDailyReward =
    async (req, res) => {

        try {

            const reward =
                await DailyReward.findById(
                    req.params.id
                );

            res.status(200)
                .json({
                    success: true,
                    data: reward
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

exports.updateDailyReward =
    async (req, res) => {

        try {

            const reward =
                await DailyReward.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200)
                .json({
                    success: true,
                    data: reward
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

exports.deleteDailyReward =
    async (req, res) => {

        try {

            await DailyReward.findByIdAndDelete(
                req.params.id
            );

            res.status(200)
                .json({
                    success: true,
                    message:
                        "Daily Reward Deleted"
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