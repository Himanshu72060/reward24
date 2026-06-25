const Reel = require("../models/Reel");
const User = require("../models/User");
const Admin = require("../models/Admin");
const WatchHistory = require("../models/WatchHistory");
const uploadToBunny = require("../utils/bunnyUpload");

// ================= CREATE REEL =================

exports.createReel = async (req, res) => {
    try {

        const {
            title,
            description,
            coins,
            watchTime
        } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Video is required"
            });
        }

        const fileName = `${Date.now()}-${file.originalname}`;

        const videoUrl = await uploadToBunny(
            file.buffer,
            fileName,
            "videos"
        );

        let creatorName = "";
        let profileImage = "";
        let creatorId = req.admin?.id || req.user?.id;

        if (req.admin) {

            const admin = await Admin.findById(req.admin.id);

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: "Admin not found"
                });
            }

            creatorName = admin.name;
            profileImage = "";

        } else {

            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            creatorName = user.fullName;
            profileImage = user.profileImage || "";

        }

        const reel = await Reel.create({

            userId: creatorId,
            name: creatorName,
            profileImage,

            title,
            description,

            coins: Number(coins) || 1,

            watchTime: Number(watchTime) || 30,

            videoUrl

        });

        return res.status(201).json({
            success: true,
            message: "Reel uploaded successfully",
            data: reel
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= GET ALL REELS =================

exports.getReels = async (req, res) => {

    try {

        const reels = await Reel.find({
            isActive: true
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: reels.length,
            data: reels
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= LIKE REEL =================

exports.likeReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });
        }

        reel.likes += 1;

        await reel.save();

        return res.status(200).json({
            success: true,
            message: "Reel liked successfully",
            likes: reel.likes
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ================= SHARE REEL =================

exports.shareReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {
            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });
        }

        reel.shares += 1;

        await reel.save();

        return res.status(200).json({
            success: true,
            message: "Reel shared successfully",
            shares: reel.shares
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ================= WATCH REWARD =================

exports.watchReward = async (req, res) => {

    try {

        const { reelId, watchedSeconds } = req.body;

        if (!reelId || watchedSeconds == null) {

            return res.status(400).json({
                success: false,
                message: "reelId and watchedSeconds are required"
            });

        }

        const reel = await Reel.findById(reelId);

        if (!reel) {

            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });

        }

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        let history = await WatchHistory.findOne({
            userId: user._id,
            reelId: reel._id
        });

        if (history && history.rewardGiven) {

            return res.status(400).json({
                success: false,
                message: "Reward already claimed for this reel"
            });

        }

        if (Number(watchedSeconds) < reel.watchTime) {

            return res.status(400).json({
                success: false,
                message: `Watch at least ${reel.watchTime} seconds to earn reward`
            });

        }

        if (!history) {

            history = new WatchHistory({
                userId: user._id,
                reelId: reel._id,
                watchedSeconds: Number(watchedSeconds),
                rewardGiven: true,
                rewardCoins: reel.coins,
                watchedAt: new Date()
            });

        } else {

            history.watchedSeconds = Number(watchedSeconds);
            history.rewardGiven = true;
            history.rewardCoins = reel.coins;
            history.watchedAt = new Date();

        }

        await history.save();

        user.coins = (user.coins || 0) + reel.coins;

        await user.save();

        reel.views += 1;

        await reel.save();

        return res.status(200).json({

            success: true,
            message: "Reward credited successfully",

            earnedCoins: reel.coins,

            totalCoins: user.coins,

            requiredWatchTime: reel.watchTime,

            watchedSeconds: Number(watchedSeconds)

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= GET SINGLE REEL =================

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

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ================= GET MY UPLOADED REELS =================

exports.getMyUploadedReels = async (req, res) => {

    try {

        const creatorId = req.admin?.id || req.user?.id;

        const reels = await Reel.find({
            userId: creatorId
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: reels.length,
            data: reels
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ================= DELETE REEL =================

exports.deleteReel = async (req, res) => {

    try {

        const reel = await Reel.findById(req.params.id);

        if (!reel) {

            return res.status(404).json({
                success: false,
                message: "Reel not found"
            });

        }

        await WatchHistory.deleteMany({
            reelId: reel._id
        });

        await Reel.findByIdAndDelete(reel._id);

        return res.status(200).json({
            success: true,
            message: "Reel deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};