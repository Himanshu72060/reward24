const StoreCategory =
    require("../models/Store");

const uploadToBunny =
    require("../utils/bunnyUpload");

const fs =
    require("fs");

// CREATE

exports.createStore =
    async (req, res) => {

        try {

            const {
                name,
                iconName,
                brandName,
                minAmount
            } = req.body;

            if (!req.file) {

                return res.status(400)
                    .json({
                        success: false,
                        message:
                            "Image Required"
                    });

            }

            const fileName =
                `${Date.now()}-${req.file.originalname}`;

            const imageUrl =
                await uploadToBunny(
                    req.file.path,
                    fileName
                );

            fs.unlinkSync(
                req.file.path
            );

            const store =
                await StoreCategory.create({

                    name,

                    iconName,

                    brands: [
                        {
                            name:
                                brandName,

                            minAmount,

                            imageUrl
                        }
                    ]
                });

            res.status(201)
                .json({
                    success: true,
                    data: store
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// GET ALL

exports.getStores =
    async (req, res) => {

        try {

            const stores =
                await StoreCategory.find();

            res.status(200)
                .json({
                    success: true,
                    data: stores
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// GET SINGLE

exports.getSingleStore =
    async (req, res) => {

        try {

            const store =
                await StoreCategory.findById(
                    req.params.id
                );

            res.status(200)
                .json({
                    success: true,
                    data: store
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// UPDATE

exports.updateStore =
    async (req, res) => {

        try {

            const store =
                await StoreCategory.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200)
                .json({
                    success: true,
                    data: store
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };

// DELETE

exports.deleteStore =
    async (req, res) => {

        try {

            await StoreCategory.findByIdAndDelete(
                req.params.id
            );

            res.status(200)
                .json({
                    success: true,
                    message:
                        "Deleted Successfully"
                });

        } catch (error) {

            res.status(500)
                .json({
                    success: false,
                    message:
                        error.message
                });

        }

    };