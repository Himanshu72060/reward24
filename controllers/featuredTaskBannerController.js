const FeaturedTaskBanner =
    require(
        "../models/FeaturedTaskBanner"
    );

// CREATE

exports.createBanner =
    async (req, res) => {

        try {

            const banner =
                await FeaturedTaskBanner.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: banner
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

exports.getBanners =
    async (req, res) => {

        try {

            const banners =
                await FeaturedTaskBanner
                    .find()
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
                message:
                    error.message
            });

        }

    };

// GET SINGLE

exports.getBanner =
    async (req, res) => {

        try {

            const banner =
                await FeaturedTaskBanner
                    .findById(
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
                message:
                    error.message
            });

        }

    };

// UPDATE

exports.updateBanner =
    async (req, res) => {

        try {

            const banner =
                await FeaturedTaskBanner
                    .findByIdAndUpdate(
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
                message:
                    error.message
            });

        }

    };

// DELETE

exports.deleteBanner =
    async (req, res) => {

        try {

            await FeaturedTaskBanner
                .findByIdAndDelete(
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
                message:
                    error.message
            });

        }

    };