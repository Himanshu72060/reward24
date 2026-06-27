const fs = require("fs");

const FeaturedTaskBanner = require("../models/FeaturedTaskBanner");

const uploadToBunny = require("../utils/bunnyUpload");


// =========================
// CREATE BANNER
// =========================

exports.createBanner = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Background image is required"

            });

        }

        const file = req.file;

        const fileBuffer = fs.readFileSync(file.path);

        const backgroundImageUrl = await uploadToBunny(

            fileBuffer,

            `${Date.now()}-${file.originalname}`,

            "featured-task-banner"

        );

        fs.unlinkSync(file.path);

        const banner = await FeaturedTaskBanner.create({

            backgroundImageUrl

        });

        return res.status(201).json({

            success: true,

            message: "Banner created successfully",

            data: banner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =========================
// GET ALL BANNERS
// =========================

exports.getBanners = async (req, res) => {

    try {

        const banners = await FeaturedTaskBanner.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: banners.length,

            data: banners

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =========================
// GET SINGLE BANNER
// =========================

exports.getBanner = async (req, res) => {

    try {

        const banner = await FeaturedTaskBanner.findById(

            req.params.id

        );

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Banner not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: banner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =========================
// UPDATE BANNER
// =========================

exports.updateBanner = async (req, res) => {

    try {

        const banner = await FeaturedTaskBanner.findById(

            req.params.id

        );

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Banner not found"

            });

        }

        if (req.file) {

            const file = req.file;

            const fileBuffer = fs.readFileSync(file.path);

            const backgroundImageUrl = await uploadToBunny(

                fileBuffer,

                `${Date.now()}-${file.originalname}`,

                "featured-task-banner"

            );

            fs.unlinkSync(file.path);

            banner.backgroundImageUrl = backgroundImageUrl;

        }

        await banner.save();

        return res.status(200).json({

            success: true,

            message: "Banner updated successfully",

            data: banner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =========================
// DELETE BANNER
// =========================

exports.deleteBanner = async (req, res) => {

    try {

        const banner = await FeaturedTaskBanner.findByIdAndDelete(

            req.params.id

        );

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Banner not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Banner deleted successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};