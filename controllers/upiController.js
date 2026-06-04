const Upi =
    require("../models/upiModel");


// CREATE UPI

exports.createUpi =
    async (req, res) => {

        try {

            const {
                name,
                minAmount,
                imageUrl
            } = req.body;

            const upi =
                await Upi.create({

                    name,

                    minAmount,

                    imageUrl

                });

            return res.status(201).json({

                success: true,

                message:
                    "UPI Created Successfully",

                data: upi

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };


// GET ALL UPI

exports.getAllUpi =
    async (req, res) => {

        try {

            const upis =
                await Upi.find()
                    .sort({
                        createdAt: -1
                    });

            return res.status(200).json({

                success: true,

                count: upis.length,

                data: upis

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };


// GET SINGLE UPI

exports.getSingleUpi =
    async (req, res) => {

        try {

            const upi =
                await Upi.findById(
                    req.params.id
                );

            if (!upi) {

                return res.status(404).json({

                    success: false,

                    message:
                        "UPI Not Found"

                });

            }

            return res.status(200).json({

                success: true,

                data: upi

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };


// UPDATE UPI

exports.updateUpi =
    async (req, res) => {

        try {

            const upi =
                await Upi.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }

                );

            if (!upi) {

                return res.status(404).json({

                    success: false,

                    message:
                        "UPI Not Found"

                });

            }

            return res.status(200).json({

                success: true,

                message:
                    "UPI Updated Successfully",

                data: upi

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };


// DELETE UPI

exports.deleteUpi =
    async (req, res) => {

        try {

            const upi =
                await Upi.findByIdAndDelete(
                    req.params.id
                );

            if (!upi) {

                return res.status(404).json({

                    success: false,

                    message:
                        "UPI Not Found"

                });

            }

            return res.status(200).json({

                success: true,

                message:
                    "UPI Deleted Successfully"

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };