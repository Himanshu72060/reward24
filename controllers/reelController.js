const Reel = require("../models/Reel");
const ReelHistory = require("../models/ReelHistory");
const User = require("../models/User");
const CoinTransaction = require("../models/CoinTransaction");

const uploadToBunny = require("../utils/bunnyUpload");


// ===========================================
// ADMIN - CREATE REEL
// ===========================================

exports.createReel = async (req, res) => {

    try {

        const {

            title,

            description,

            coins,

            watchTime,

            category

        } = req.body;

        const videoFile = req.files?.video?.[0];

        const imageFile = req.files?.image?.[0];

        if (!videoFile || !imageFile) {

            return res.status(400).json({

                success: false,

                message: "Video and Image are required"

            });

        }

        // ==========================
        // VIDEO UPLOAD
        // ==========================

        const videoUrl = await uploadToBunny(

            videoFile.buffer,

            Date.now() + "-" + videoFile.originalname,

            "reels/videos"

        );

        // ==========================
        // IMAGE UPLOAD
        // ==========================

        const imageUrl = await uploadToBunny(

            imageFile.buffer,

            Date.now() + "-" + imageFile.originalname,

            "reels/images"

        );

        // ==========================
        // CREATE REEL
        // ==========================

        const reel = await Reel.create({

            userId: req.admin.id,

            name: "Admin",

            profileImage: imageUrl,

            title,

            description,

            videoUrl,

            thumbnail: imageUrl,

            coins: Number(coins),

            watchTime: Number(watchTime),

            category,

            likes: 0,

            shares: 0,

            views: 0,

            totalRewardsGiven: 0,

            adBeforeStart: true,

            adAfterFiveSeconds: true,

            isApproved: true,

            isActive: true

        });

        return res.status(201).json({

            success: true,

            message: "Reel Created Successfully",

            data: reel

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - GET ALL REELS
// ===========================================

exports.getAllReels = async (req, res) => {

    try {

        const reels = await Reel.find()

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: reels.length,

            data: reels

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - GET SINGLE REEL
// ===========================================

exports.getSingleReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {

            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }

        return res.status(200).json({

            success: true,

            data: reel

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================
// ADMIN - UPDATE REEL
// ===========================================

exports.updateReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {

            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }

        const {

            title,

            description,

            coins,

            watchTime,

            category,

            isApproved,

            isActive

        } = req.body;

        // ==========================
        // VIDEO UPDATE
        // ==========================

        const videoFile = req.files?.video?.[0];

        if (videoFile) {

            reel.videoUrl = await uploadToBunny(

                videoFile.buffer,

                Date.now() + "-" + videoFile.originalname,

                "reels/videos"

            );

        }

        // ==========================
        // IMAGE UPDATE
        // ==========================

        const imageFile = req.files?.image?.[0];

        if (imageFile) {

            const imageUrl = await uploadToBunny(

                imageFile.buffer,

                Date.now() + "-" + imageFile.originalname,

                "reels/images"

            );

            reel.profileImage = imageUrl;

            reel.thumbnail = imageUrl;

        }

        // ==========================
        // UPDATE DATA
        // ==========================

        if (title) reel.title = title;

        if (description) reel.description = description;

        if (coins) reel.coins = Number(coins);

        if (watchTime) reel.watchTime = Number(watchTime);

        if (category) reel.category = category;

        if (isApproved !== undefined)
            reel.isApproved = isApproved;

        if (isActive !== undefined)
            reel.isActive = isActive;

        await reel.save();

        return res.status(200).json({

            success: true,

            message: "Reel updated successfully",

            data: reel

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// ADMIN - DELETE REEL
// ===========================================

exports.deleteReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {

            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }
        await ReelHistory.deleteMany({

            reelId: reel._id

        });
        await reel.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Reel deleted successfully"

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===========================================
// USER - GET ACTIVE REELS
// ===========================================

exports.getUserReels = async (req, res) => {

    try {

        const reels = await Reel.find({

            isApproved: true,

            isActive: true

        }).sort({

            createdAt: -1

        });

        return res.status(200).json({

            success: true,

            count: reels.length,

            data: reels

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ===========================================
// USER - COMPLETE REEL
// ===========================================

exports.completeReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {

            return res.status(404).json({

                success: false,

                message: "Reel not found"

            });

        }

        const { watchedSeconds } = req.body;

        if (
            watchedSeconds === undefined ||
            isNaN(watchedSeconds) ||
            Number(watchedSeconds) <= 0
        ) {

            return res.status(400).json({

                success: false,

                message: "Invalid watchedSeconds"

            });

        }
        if (Number(watchedSeconds) > reel.watchTime + 10) {

            return res.status(400).json({

                success: false,

                message: "Invalid watch time"

            });

        }

        if (Number(watchedSeconds) < reel.watchTime) {

            return res.status(400).json({

                success: false,

                message: `Watch minimum ${reel.watchTime} seconds to earn reward.`

            });

        }

        if (!reel.isActive || !reel.isApproved) {

            return res.status(400).json({

                success: false,

                message: "Reel is not available"

            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        // ===============================
        // DUPLICATE CHECK
        // ===============================

        const alreadyClaimed = await ReelHistory.findOne({

            userId: user._id,

            reelId: reel._id

        });

        if (alreadyClaimed) {

            return res.status(400).json({

                success: false,

                message: "Reward already claimed"

            });

        }

        // ===============================
        // WALLET UPDATE
        // ===============================

        user.coins += reel.coins;

        user.totalEarnedCoins += reel.coins;

        await user.save();

        // ===============================
        // SAVE HISTORY
        // ===============================

        // const history = await ReelHistory.create({

        //     userId: user._id,

        //     reelId: reel._id,

        //     rewardCoins: reel.coins,

        //     watchedSeconds: reel.watchTime,

        //     status: "completed"

        // });

        const history = await ReelHistory.create({

            userId: user._id,

            reelId: reel._id,

            rewardCoins: reel.coins,

            watchedSeconds: Number(watchedSeconds),

            status: "completed"

        });

        // ===============================
        // COIN TRANSACTION
        // ===============================

        await CoinTransaction.create({

            userId: user._id,

            coins: reel.coins,

            type: "reel_watch",

            status: "completed",

            description:
                `Reel Reward - ${reel.title}`

        });

        // ===============================
        // TOTAL REWARDS COUNT
        // ===============================

        reel.totalRewardsGiven += 1;

        reel.views += 1;

        await reel.save();

        return res.status(200).json({

            success: true,

            message: "Reward credited successfully",

            rewardCoins: reel.coins,

            totalCoins: user.coins,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===========================================
// USER - REEL HISTORY
// ===========================================

exports.getMyReelHistory = async (req, res) => {

    try {

        const history = await ReelHistory.find({

            userId: req.user.id

        })

            .populate(

                "reelId",

                "title videoUrl thumbnail coins"

            )

            .sort({

                createdAt: -1

            });

        return res.status(200).json({

            success: true,

            count: history.length,

            data: history

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};