const fs = require("fs");
const FeaturedTaskBanner = require("../models/FeaturedTaskBanner");
const uploadToBunny = require("../utils/bunnyUpload");

// CREATE

exports.createBanner = async (req, res) => {
    console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);
    console.log("FILE KEYS =>", Object.keys(req.files || {}));
    try {

        let backgroundImageUrl = "";
        let taskImageUrl = "";

        // Background Image Upload
        if (req.files?.backgroundImage?.length) {
            console.log("Background file =>", req.files.backgroundImage?.[0]);

            const file = req.files.backgroundImage[0];

            const fileBuffer = fs.readFileSync(file.path);

            backgroundImageUrl = await uploadToBunny(
                fileBuffer,
                `${Date.now()}-${file.originalname}`,
                "featured-task-banners/backgrounds"
            );

            fs.unlinkSync(file.path);
        }

        // Task Image Upload
        if (req.files?.taskImage?.length) {
            console.log("Task file =>", req.files.taskImage?.[0]);

            const file = req.files.taskImage[0];

            const fileBuffer = fs.readFileSync(file.path);

            taskImageUrl = await uploadToBunny(
                fileBuffer,
                `${Date.now()}-${file.originalname}`,
                "featured-task-banners/tasks"
            );

            fs.unlinkSync(file.path);
        }

        const banner = await FeaturedTaskBanner.create({

            tagText: req.body.tagText,

            title: req.body.title,

            subtitle: req.body.subtitle,

            backgroundImageUrl,

            taskImageUrl,

            startColorHex: req.body.startColorHex,

            endColorHex: req.body.endColorHex,

            tagColorHex: req.body.tagColorHex,

            buttonText: req.body.buttonText

        });

        res.status(201).json({
            success: true,
            data: banner
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// GET ALL

exports.getBanners =
    async (
        req,
        res
    ) => {

        try {

            const banners =
                await FeaturedTaskBanner.find()
                    .sort({
                        createdAt: -1
                    });

            res.json({
                success: true,
                data: banners
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

exports.getBanner =
    async (
        req,
        res
    ) => {

        try {

            const banner =
                await FeaturedTaskBanner.findById(
                    req.params.id
                );

            res.json({
                success: true,
                data: banner
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

exports.updateBanner =
    async (
        req,
        res
    ) => {

        try {

            const banner =
                await FeaturedTaskBanner.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json({
                success: true,
                data: banner
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

exports.deleteBanner =
    async (
        req,
        res
    ) => {

        try {

            await FeaturedTaskBanner.findByIdAndDelete(
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