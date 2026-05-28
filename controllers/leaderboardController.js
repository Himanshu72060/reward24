const Leaderboard =
    require(
        "../models/Leaderboard"
    );

// ================= CREATE =================

exports.createLeaderboard =
    async (req, res) => {

        try {

            const data =
                await Leaderboard.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data
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

exports.getLeaderboards =
    async (req, res) => {

        try {

            const data =
                await Leaderboard.find();

            res.status(200).json({
                success: true,
                data
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };

// ================= GET BY TYPE =================

exports.getLeaderboardByType =
    async (req, res) => {

        try {

            const data =
                await Leaderboard.findOne({

                    type:
                        req.params.type

                });

            res.status(200).json({
                success: true,
                data
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

exports.updateLeaderboard =
    async (req, res) => {

        try {

            const data =
                await Leaderboard.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({
                success: true,
                data
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

exports.deleteLeaderboard =
    async (req, res) => {

        try {

            await Leaderboard.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Leaderboard Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };