const PromoBanner = require("../models/PromoBanner");
const axios = require("axios");
const bunny = require("../config/bunny");

// ================= BUNNY UPLOAD =================

const uploadToBunny = async (file) => {

    const fileName =
        Date.now() + "-" + file.originalname;

    const uploadPath =
        "promo-banner/" + fileName;

    await axios.put(

        bunny.storageUrl + uploadPath,

        file.buffer,

        {
            headers: {
                AccessKey: bunny.accessKey,
                "Content-Type": file.mimetype
            }
        }

    );

    return bunny.cdnUrl + "/" + uploadPath;

};


// ================= CREATE =================

exports.createBanner = async (req, res) => {

    try {

        console.log(req.file);

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "Background image is required"

            });

        }

        const backgroundImageUrl =
            await uploadToBunny(req.file);

        const banner =
            await PromoBanner.create({

                backgroundImageUrl

            });

        return res.status(201).json({

            success: true,
            message: "Banner Created Successfully",
            data: banner

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ================= GET ALL =================

exports.getBanners = async (req, res) => {

    try {

        const banners =
            await PromoBanner.find().sort({
                createdAt: -1
            });

        return res.status(200).json({

            success: true,
            data: banners

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ================= GET SINGLE =================

exports.getBanner = async (req, res) => {

    try {

        const banner =
            await PromoBanner.findById(req.params.id);

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


// ================= UPDATE =================

exports.updateBanner = async (req, res) => {

    try {

        const banner =
            await PromoBanner.findById(req.params.id);

        if (!banner) {

            return res.status(404).json({

                success: false,
                message: "Banner not found"

            });

        }

        if (req.file) {

            banner.backgroundImageUrl =
                await uploadToBunny(req.file);

        }

        await banner.save();

        return res.status(200).json({

            success: true,
            message: "Banner Updated Successfully",
            data: banner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ================= DELETE =================

exports.deleteBanner = async (req, res) => {

    try {

        const banner =
            await PromoBanner.findById(req.params.id);

        if (!banner) {

            return res.status(404).json({

                success: false,
                message: "Banner not found"

            });

        }

        await PromoBanner.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,
            message: "Banner Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};