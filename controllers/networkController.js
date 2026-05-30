const Network =
    require("../models/networkModel");

// CREATE

exports.createNetwork =
    async (req, res) => {

        try {

            const network =
                await Network.create(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: network
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

// GET

exports.getNetwork =
    async (req, res) => {

        try {

            const network =
                await Network.findOne();

            res.status(200).json({
                success: true,
                data: network
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

exports.updateNetwork =
    async (req, res) => {

        try {

            const network =
                await Network.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.status(200).json({
                success: true,
                data: network
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

exports.deleteNetwork =
    async (req, res) => {

        try {

            await Network.findByIdAndDelete(
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
    