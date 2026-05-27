const Earning =
    require("../models/Earning");

// CREATE

exports.createEarning =
    async (req, res) => {

        try {

            const earning =
                await Earning.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: earning
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

exports.getEarnings =
    async (req, res) => {

        try {

            const earnings =
                await Earning.find();

            res.status(200).json({
                success: true,
                data: earnings
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

exports.getSingleEarning =
    async (req, res) => {

        try {

            const earning =
                await Earning.findById(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data: earning
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

exports.updateEarning =
    async (req, res) => {

        try {

            const earning =
                await Earning.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

            res.status(200).json({
                success: true,
                data: earning
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

exports.deleteEarning =
    async (req, res) => {

        try {

            await Earning.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Deleted Successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };