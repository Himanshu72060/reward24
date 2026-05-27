const Reward =
    require("../models/Reward");

// CREATE

exports.createReward =
    async (req, res) => {

        try {

            const reward =
                await Reward.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                data: reward

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// GET ALL

exports.getRewards =
    async (req, res) => {

        try {

            const rewards =
                await Reward.find();

            res.status(200).json({

                success: true,

                data: rewards

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// GET SINGLE

exports.getSingleReward =
    async (req, res) => {

        try {

            const reward =
                await Reward.findById(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                data: reward

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// UPDATE

exports.updateReward =
    async (req, res) => {

        try {

            const reward =
                await Reward.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    { new: true }

                );

            res.status(200).json({

                success: true,

                data: reward

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// DELETE

exports.deleteReward =
    async (req, res) => {

        try {

            await Reward.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Reward Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };