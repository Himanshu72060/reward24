const MicroOffer =
    require("../models/MicroOffer");

// CREATE

exports.createMicroOffer =
    async (req, res) => {

        try {

            const data =
                await MicroOffer.create(
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

// GET ALL

exports.getMicroOffers =
    async (req, res) => {

        try {

            const data =
                await MicroOffer.find();

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

// GET SINGLE

exports.getSingleMicroOffer =
    async (req, res) => {

        try {

            const data =
                await MicroOffer.findById(
                    req.params.id
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

// UPDATE

exports.updateMicroOffer =
    async (req, res) => {

        try {

            const data =
                await MicroOffer.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
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

// DELETE

exports.deleteMicroOffer =
    async (req, res) => {

        try {

            await MicroOffer.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Micro Offer Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };