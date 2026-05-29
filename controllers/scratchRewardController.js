const ScratchReward =
    require(
        "../models/ScratchReward"
    );

// ================= CREATE =================

exports.createScratchReward =
    async (req, res) => {

        try {

            const reward =
                await ScratchReward.create(
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

// ================= GET ALL =================

exports.getScratchRewards =
    async (req, res) => {

        try {

            const rewards =
                await ScratchReward.find()

                    .sort({
                        createdAt: -1
                    });

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

// ================= GET SINGLE =================

exports.getSingleScratchReward =
    async (req, res) => {

        try {

            const reward =
                await ScratchReward.findById(
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

// ================= UPDATE =================

exports.updateScratchReward =
    async (req, res) => {

        try {

            const reward =
                await ScratchReward.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

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

// ================= DELETE =================

exports.deleteScratchReward =
    async (req, res) => {

        try {

            await ScratchReward.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Scratch Reward Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };