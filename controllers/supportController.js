const Support =
    require("../models/Support");

// CREATE

exports.createSupport =
    async (req, res) => {

        try {

            const support =
                await Support.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                data: support

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

exports.getSupports =
    async (req, res) => {

        try {

            const supports =
                await Support.find();

            res.status(200).json({

                success: true,

                data: supports

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

exports.getSingleSupport =
    async (req, res) => {

        try {

            const support =
                await Support.findById(
                    req.params.id
                );

            if (!support) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Support Not Found"

                    });

            }

            res.status(200).json({

                success: true,

                data: support

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

exports.updateSupport =
    async (req, res) => {

        try {

            const support =
                await Support.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({

                success: true,

                data: support

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

exports.deleteSupport =
    async (req, res) => {

        try {

            await Support.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Support Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };