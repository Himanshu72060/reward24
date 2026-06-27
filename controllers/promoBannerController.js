const PromoBanner = require("../models/PromoBanner");
const axios = require("axios");
const bunny = require("../config/bunny");

// ==========================
// BUNNY UPLOAD FUNCTION
// ==========================

const uploadToBunny = async (file, folder) => {

    const fileName =
        Date.now() + "-" + file.originalname;

    const uploadPath =
        folder + "/" + fileName;

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


// ==========================
// CREATE PROMO BANNER (ADMIN)
// ==========================

exports.createBanner = async (req, res) => {

    try {

        const {

            tagText,

            title,

            subtitle,

            startColorHex,

            endColorHex,

            buttonText

        } = req.body;


        if (!title) {

            return res.status(400).json({

                success: false,

                message: "Title is required"

            });

        }


        if (

            !req.files ||

            !req.files.backgroundImage ||

            !req.files.foregroundImage

        ) {

            return res.status(400).json({

                success: false,

                message: "Background Image and Foreground Image are required"

            });

        }


        const backgroundImageUrl =
            await uploadToBunny(

                req.files.backgroundImage[0],

                "promo-banners/background"

            );


        const foregroundImageUrl =
            await uploadToBunny(

                req.files.foregroundImage[0],

                "promo-banners/foreground"

            );


        const banner =
            await PromoBanner.create({

                tagText,

                title,

                subtitle,

                backgroundImageUrl,

                foregroundImageUrl,

                startColorHex,

                endColorHex,

                buttonText

            });


        return res.status(201).json({

            success: true,

            message: "Promo Banner Created Successfully",

            data: banner

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// GET ALL PROMO BANNERS
// ==========================

exports.getBanners = async (req, res) => {

    try {

        const banners = await PromoBanner
            .find()
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


// ==========================
// GET SINGLE PROMO BANNER
// ==========================

exports.getBanner = async (req, res) => {

    try {

        const banner = await PromoBanner.findById(
            req.params.id
        );

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Promo Banner not found"

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

// ==========================
// UPDATE PROMO BANNER
// ==========================

exports.updateBanner = async (req, res) => {

    try {

        const banner = await PromoBanner.findById(req.params.id);

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Promo Banner not found"

            });

        }

        // Background Image Update

        if (

            req.files &&

            req.files.backgroundImage

        ) {

            const backgroundImageUrl =
                await uploadToBunny(

                    req.files.backgroundImage[0],

                    "promo-banners/background"

                );

            banner.backgroundImageUrl =
                backgroundImageUrl;

        }

        // Foreground Image Update

        if (

            req.files &&

            req.files.foregroundImage

        ) {

            const foregroundImageUrl =
                await uploadToBunny(

                    req.files.foregroundImage[0],

                    "promo-banners/foreground"

                );

            banner.foregroundImageUrl =
                foregroundImageUrl;

        }

        banner.tagText =
            req.body.tagText || banner.tagText;

        banner.title =
            req.body.title || banner.title;

        banner.subtitle =
            req.body.subtitle || banner.subtitle;

        banner.startColorHex =
            req.body.startColorHex || banner.startColorHex;

        banner.endColorHex =
            req.body.endColorHex || banner.endColorHex;

        banner.buttonText =
            req.body.buttonText || banner.buttonText;

        await banner.save();

        return res.status(200).json({

            success: true,

            message: "Promo Banner Updated Successfully",

            data: banner

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================
// DELETE PROMO BANNER
// ==========================

exports.deleteBanner = async (req, res) => {

    try {

        const banner = await PromoBanner.findById(req.params.id);

        if (!banner) {

            return res.status(404).json({

                success: false,

                message: "Promo Banner not found"

            });

        }

        await PromoBanner.findByIdAndDelete(req.params.id);

        return res.status(200).json({

            success: true,

            message: "Promo Banner Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};