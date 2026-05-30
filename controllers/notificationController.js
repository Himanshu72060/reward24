const Notification =
    require("../models/Notification");

// CREATE

exports.createNotification =
    async (req, res) => {

        try {

            const notification =
                await Notification.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                data: notification

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

exports.getNotifications =
    async (req, res) => {

        try {

            const notifications =
                await Notification.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                data: notifications

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

exports.getSingleNotification =
    async (req, res) => {

        try {

            const notification =
                await Notification.findById(
                    req.params.id
                );

            if (!notification) {

                return res.status(404)
                    .json({

                        success: false,

                        message:
                            "Notification Not Found"

                    });

            }

            res.status(200).json({

                success: true,

                data: notification

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

exports.updateNotification =
    async (req, res) => {

        try {

            const notification =
                await Notification.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({

                success: true,

                data: notification

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

exports.deleteNotification =
    async (req, res) => {

        try {

            await Notification.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({

                success: true,

                message:
                    "Notification Deleted"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };