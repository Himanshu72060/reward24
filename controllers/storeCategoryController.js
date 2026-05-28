const StoreCategory =
    require(
        "../models/StoreCategory"
    );

// ================= CREATE =================

exports.createStoreCategory =
    async (req, res) => {

        try {

            const category =
                await StoreCategory.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: category
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

exports.getStoreCategories =
    async (req, res) => {

        try {

            const categories =
                await StoreCategory.find();

            res.status(200).json({
                success: true,
                data: categories
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

exports.getSingleStoreCategory =
    async (req, res) => {

        try {

            const category =
                await StoreCategory.findById(
                    req.params.id
                );

            if (!category) {

                return res.status(404)
                    .json({
                        success: false,
                        message:
                            "Category not found"
                    });

            }

            res.status(200).json({
                success: true,
                data: category
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

exports.updateStoreCategory =
    async (req, res) => {

        try {

            const category =
                await StoreCategory.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({
                success: true,
                data: category
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

exports.deleteStoreCategory =
    async (req, res) => {

        try {

            await StoreCategory.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "Category Deleted"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });

        }

    };