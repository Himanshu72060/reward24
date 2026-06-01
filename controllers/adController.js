const Ad =
    require("../models/Ad");

const uploadToBunny =
    require("../utils/bunnyUpload");

const fs =
    require("fs");

// CREATE AD

exports.createAd =
    async (req, res) => {

        try {

            let mediaUrl =
                "";

            if (req.file) {

                mediaUrl =
                    await uploadToBunny(
                        req.file.path,
                        Date.now() +
                        "-" +
                        req.file.originalname
                    );

                fs.unlinkSync(
                    req.file.path
                );
            }

            const ad =
                await Ad.create({

                    title:
                        req.body.title,

                    description:
                        req.body.description,

                    adType:
                        req.body.adType,

                    mediaUrl,

                    redirectUrl:
                        req.body.redirectUrl,

                    duration:
                        req.body.duration,

                    isActive:
                        req.body.isActive

                });

            res.status(201)
                .json({
                    success: true,
                    data: ad
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


// GET RANDOM AD

exports.getAd =
    async (req, res) => {

        try {

            const ads =
                await Ad.find({
                    isActive: true
                });

            if (
                ads.length === 0
            ) {

                return res.json({
                    success: true,
                    data: null
                });
            }

            const ad =
                ads[
                Math.floor(
                    Math.random() *
                    ads.length
                )
                ];

            res.json({
                success: true,
                data: ad
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

exports.getAds =
    async (req, res) => {

        try {

            const ads =
                await Ad.find()
                    .sort({
                        createdAt: -1
                    });

            res.json({
                success: true,
                data: ads
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

exports.updateAd =
    async (req, res) => {

        try {

            const ad =
                await Ad.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: ad
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

exports.deleteAd =
    async (req, res) => {

        try {

            await Ad.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Ad Deleted"
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