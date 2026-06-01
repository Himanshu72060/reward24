const UserProfile =
    require("../models/UserProfile");

// CREATE

exports.createUserProfile =
    async (req, res) => {

        try {

            const profile =
                await UserProfile.create(
                    {
                        ...req.body,
                        userId: req.user.id
                    }
                );

            res.status(201).json({

                success: true,

                data: profile

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

exports.getUserProfiles =
    async (req, res) => {

        try {

            const profiles =
                await UserProfile.find();

            res.status(200).json({

                success: true,

                data: profiles

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

// GET SINGLE

exports.getSingleUserProfile =
    async (req, res) => {

        try {

            const profile =
                await UserProfile.findOne({

                    userId:
                        req.user.id

                });

            if (!profile) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Profile Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data: profile

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

exports.updateUserProfile =
    async (req, res) => {

        try {

            const profile =
                await UserProfile.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({

                success: true,

                data: profile

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

exports.deleteUserProfile =
    async (req, res) => {

        try {

            await UserProfile.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Profile Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };