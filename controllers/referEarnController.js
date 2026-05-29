const ReferEarn =
    require("../models/ReferEarn");

// ================= CREATE =================

exports.createReferEarn =
    async (req, res) => {

        try {

            const referEarn =
                await ReferEarn.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: referEarn
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

exports.getReferEarns =
    async (req, res) => {

        try {

            const referEarns =
                await ReferEarn.find();

            res.status(200).json({
                success: true,
                data: referEarns
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

exports.getSingleReferEarn =
    async (req, res) => {

        try {

            const referEarn =
                await ReferEarn.findById(
                    req.params.id
                );

            if (!referEarn) {

                return res.status(404)
                    .json({
                        success: false,
                        message:
                            "Data Not Found"
                    });

            }

            res.status(200).json({
                success: true,
                data: referEarn
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

exports.updateReferEarn =
    async (req, res) => {

        try {

            const referEarn =
                await ReferEarn.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({
                success: true,
                data: referEarn
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

exports.deleteReferEarn =
    async (req, res) => {

        try {

            await ReferEarn.findByIdAndDelete(
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