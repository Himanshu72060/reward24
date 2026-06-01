const RedeemOption =
    require("../models/RedeemOption");

// CREATE

exports.createRedeemOption =
    async (req, res) => {

        try {

            const redeem =
                await RedeemOption.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: redeem
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };


// GET ALL

exports.getRedeemOptions =
    async (req, res) => {

        try {

            const data =
                await RedeemOption.find({
                    isActive: true
                });

            res.status(200).json({
                success: true,
                data
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };


// GET SINGLE

exports.getRedeemOption =
    async (req, res) => {

        try {

            const data =
                await RedeemOption.findById(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };


// UPDATE

exports.updateRedeemOption =
    async (req, res) => {

        try {

            const data =
                await RedeemOption.findByIdAndUpdate(

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
                message: error.message
            });

        }

    };


// DELETE

exports.deleteRedeemOption =
    async (req, res) => {

        try {

            await RedeemOption.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message: "Deleted Successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };