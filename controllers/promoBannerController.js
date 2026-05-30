const PromoBanner =
    require("../models/PromoBanner");

// CREATE

exports.createBanner =
    async (req, res) => {

        try {

            const banner =
                await PromoBanner.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: banner
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// GET ALL

exports.getBanners =
    async (req, res) => {

        try {

            const banners =
                await PromoBanner.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({
                success: true,
                data: banners
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// GET SINGLE

exports.getBanner =
    async (req, res) => {

        try {

            const banner =
                await PromoBanner.findById(
                    req.params.id
                );

            if (!banner) {

                return res.status(404)
                    .json({
                        success: false,
                        message:
                            "Banner not found"
                    });

            }

            res.status(200).json({
                success: true,
                data: banner
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// UPDATE

exports.updateBanner =
    async (req, res) => {

        try {

            const banner =
                await PromoBanner.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    {
                        new: true
                    }
                );

            res.status(200).json({
                success: true,
                data: banner
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

// DELETE

exports.deleteBanner =
    async (req, res) => {

        try {

            await PromoBanner.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Banner Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };