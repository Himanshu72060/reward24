const Reel =
    require("../models/Reel");

const User =
    require("../models/User");

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
                description,
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

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const reel =
                await Reel.create({

                    userId:
                        user._id,

                    name:
                        user.fullName,

                    profileImage:
                        user.profileImage || "",

                    title,

                    description,

                    coins:
                        coins || 1,

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


// LIKE

exports.likeReel =
    async (req, res) => {

        try {

            const reel =
                await Reel.findByIdAndUpdate(

                    req.params.id,

                    {
                        $inc: {
                            likes: 1
                        }
                    },

                    {
                        new: true
                    }
                );

            res.json({
                success: true,
                data: reel
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }

    };


// SHARE

exports.shareReel =
    async (req, res) => {

        try {

            const reel =
                await Reel.findByIdAndUpdate(

                    req.params.id,

                    {
                        $inc: {
                            shares: 1
                        }
                    },

                    {
                        new: true
                    }
                );

            res.json({
                success: true,
                data: reel
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }

    };


// WATCH REWARD

exports.watchReward =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                );

            user.coins =
                (user.coins || 0) + 1;

            await user.save();

            res.json({

                success: true,

                earnedCoin: 1,

                totalCoins:
                    user.coins

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

exports.deleteReel =
    async (req, res) => {

        try {

            await Reel.findByIdAndDelete(
                req.params.id
            );

            res.json({

                success: true,

                message:
                    "Deleted"

            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }

    };