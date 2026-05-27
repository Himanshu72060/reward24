const Reel =
    require("../models/Reel");

const uploadToBunny =
    require("../utils/bunnyUpload");

const fs =
    require("fs");

// CREATE REEL

exports.createReel =
    async (req, res) => {

        try {

            const {
                title,
                coins
            } = req.body;

            const file =
                req.file;

            if (!file) {

                return res.status(400)
                    .json({
                        success: false,
                        message:
                            "Video Required"
                    });

            }

            const fileName =
                `${Date.now()}-${file.originalname}`;

            const videoUrl =
                await uploadToBunny(
                    file.path,
                    fileName
                );

            fs.unlinkSync(
                file.path
            );

            const reel =
                await Reel.create({
                    title,
                    coins,
                    videoUrl
                });

            res.status(201)
                .json({
                    success: true,
                    data: reel
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

// GET ALL REELS

exports.getReels =
    async (req, res) => {

        try {

            const reels =
                await Reel.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200)
                .json({
                    success: true,
                    data: reels
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

exports.deleteReel =
    async (req, res) => {

        try {

            await Reel.findByIdAndDelete(
                req.params.id
            );

            res.status(200)
                .json({
                    success: true,
                    message:
                        "Deleted"
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