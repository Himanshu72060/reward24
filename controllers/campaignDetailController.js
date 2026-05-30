const fs =
    require("fs");

const CampaignDetail =
    require(
        "../models/CampaignDetail"
    );

const uploadToBunny =
    require(
        "../utils/bunnyUpload"
    );


// CREATE

exports.createCampaign =
    async (
        req,
        res
    ) => {

        try {

            let imageUrl = "";

            let watchVideoUrl = "";

            if (
                req.files?.image
            ) {

                const image =
                    req.files.image[0];

                imageUrl =
                    await uploadToBunny(
                        image.path,
                        Date.now() +
                        "-" +
                        image.originalname
                    );

                fs.unlinkSync(
                    image.path
                );
            }

            if (
                req.files?.video
            ) {

                const video =
                    req.files.video[0];

                watchVideoUrl =
                    await uploadToBunny(
                        video.path,
                        Date.now() +
                        "-" +
                        video.originalname
                    );

                fs.unlinkSync(
                    video.path
                );
            }

            const campaign =
                await CampaignDetail.create({

                    title:
                        req.body.title,

                    subtitle:
                        req.body.subtitle,

                    imageUrl,

                    coins:
                        req.body.coins,

                    playStoreUrl:
                        req.body.playStoreUrl,

                    watchVideoUrl

                });

            res.status(201)
                .json({
                    success: true,
                    data: campaign
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

exports.getCampaigns =
    async (
        req,
        res
    ) => {

        try {

            const campaigns =
                await CampaignDetail.find()
                    .sort({
                        createdAt: -1
                    });

            res.json({
                success: true,
                data: campaigns
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


// GET SINGLE

exports.getCampaign =
    async (
        req,
        res
    ) => {

        try {

            const campaign =
                await CampaignDetail.findById(
                    req.params.id
                );

            res.json({
                success: true,
                data: campaign
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

exports.updateCampaign =
    async (
        req,
        res
    ) => {

        try {

            const campaign =
                await CampaignDetail.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: campaign
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

exports.deleteCampaign =
    async (
        req,
        res
    ) => {

        try {

            await CampaignDetail.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Deleted Successfully"
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