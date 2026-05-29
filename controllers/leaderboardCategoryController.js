const LeaderboardCategory =
    require(
        "../models/LeaderboardCategory"
    );

// ================= CREATE =================

exports.createCategory =
    async (req, res) => {

        try {

            const category =
                await LeaderboardCategory.create(
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

exports.getCategories =
    async (req, res) => {

        try {

            const categories =
                await LeaderboardCategory.find()
                    .sort({
                        createdAt: -1
                    });

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

exports.getSingleCategory =
    async (req, res) => {

        try {

            const category =
                await LeaderboardCategory.findById(
                    req.params.id
                );

            if (!category) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Category Not Found"

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

exports.updateCategory =
    async (req, res) => {

        try {

            const category =
                await LeaderboardCategory.findByIdAndUpdate(

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

exports.deleteCategory =
    async (req, res) => {

        try {

            await LeaderboardCategory.findByIdAndDelete(
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