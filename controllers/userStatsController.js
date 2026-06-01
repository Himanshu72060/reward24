const UserStats =
    require("../models/UserStats");

// CREATE

exports.createStats =
    async (req, res) => {

        try {

            const stats =
                await UserStats.create({

                    ...req.body,

                    userId:
                        req.user.id

                });

            res.status(201).json({
                success: true,
                data: stats
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// GET

exports.getStats =
    async (req, res) => {

        try {


            const stats =
                await UserStats.findOne({
                    userId: req.user.id
                });


            res.json({
                success: true,
                data: stats
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// UPDATE

exports.updateStats =
    async (req, res) => {

        try {

            const stats =
                await UserStats.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: stats
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// DELETE

exports.deleteStats =
    async (req, res) => {

        try {

            await UserStats.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message: "Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };